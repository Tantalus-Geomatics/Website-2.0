import os
import re
import json
import sys

def parse_txt_file(file_path):
    """
    Parses the custom structured text file into isolated content sections.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize line endings
    content = content.replace('\r\n', '\n')

    # Identify the section headers using regex
    header_pattern = re.compile(
        r'^(# Title|### \*\*Body\*\*|### \*\*Steps\*\*|### \*\*Deliverables\*\*|### \*\*FAQs\*\*)', 
        re.MULTILINE
    )
    
    matches = list(header_pattern.finditer(content))
    sections = {}
    
    for i, match in enumerate(matches):
        start = match.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(content)
        # Clean section name to map into dictionary keys
        section_key = match.group(1).replace('#', '').replace('*', '').strip().lower()
        sections[section_key] = content[start:end].strip()

    return sections

def parse_steps(steps_text):
    """
    Parses numbered steps into an array of dict items: [{'title': '...', 'description': '...'}]
    """
    if not steps_text:
        return []
    
    steps = []
    # Split by step numbers (e.g., 1. or 1\.)
    step_blocks = re.split(r'^\s*\d+[\.\\]+\s*', steps_text, flags=re.MULTILINE)
    
    for block in step_blocks:
        block = block.strip()
        if not block:
            continue
        
        # Match step title inside markdown bold characters: **Title** Rest of description
        match = re.search(r'^\*\*(.*?)\*\*(.*)', block, re.DOTALL)
        if match:
            title = match.group(1).strip()
            description = match.group(2).strip()
            # Flatten multi-line description into clean single-spaced layout
            description = re.sub(r'\s+', ' ', description)
            steps.append({"title": title, "description": description})
        else:
            steps.append({"title": "Process Step", "description": re.sub(r'\s+', ' ', block)})
            
    return steps

def parse_deliverables(deliverables_text):
    """
    Parses bulleted deliverables into an array of strings, stripping markdown bold tags.
    """
    if not deliverables_text:
        return []
    
    deliverables = []
    lines = deliverables_text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove leading bullet symbols (*, -, +)
        line = re.sub(r'^[\*\-\+]\s*', '', line).strip()
        # Clean out bold asterisks for clean string inject
        line = line.replace('**', '')
        if line:
            deliverables.append(line)
            
    return deliverables

def parse_faqs(faqs_text):
    """
    Parses numbered/bold FAQs into an array of dict items: [{'question': '...', 'answer': '...'}]
    """
    if not faqs_text:
        return []
    
    faqs = []
    # Match pattern: **1\. Question?** Answer body up to next question or end
    faq_pattern = re.compile(r'\*\*?\d+[\.\\\s]+(.*?)\*\*?\s*(.*?)(?=\*\*?\d+[\.\\\s]+|\Z)', re.DOTALL)
    
    for match in faq_pattern.finditer(faqs_text):
        question = match.group(1).strip()
        answer = match.group(2).strip()
        # Standardize extra spaces inside paragraphs
        answer = re.sub(r'\s+', ' ', answer)
        faqs.append({"question": question, "answer": answer})
        
    return faqs

def convert_directory(source_dir, output_dir):
    """
    Iterates through all .txt files in source_dir and converts them to .mdx in output_dir.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output folder: {output_dir}")

    txt_files = [f for f in os.listdir(source_dir) if f.endswith('.txt')]
    
    if not txt_files:
        print(f"No .txt files found in source folder '{source_dir}'.")
        return

    print(f"Found {len(txt_files)} source files. Starting compilation pipeline...")

    for file_name in txt_files:
        source_path = os.path.join(source_dir, file_name)
        
        # Determine clean URL slug out of filename (e.g., "Subdivisions Surveys.txt" -> "subdivision-surveys.mdx")
        slug_name = os.path.splitext(file_name)[0].lower()
        slug_name = re.sub(r'[^a-z0-9]+', '-', slug_name).strip('-')
        output_file_name = f"{slug_name}.mdx"
        output_path = os.path.join(output_dir, output_file_name)
        
        # Parse clean serviceName (e.g., "Subdivisions Surveys.txt" -> "Subdivision Surveys")
        base_name = os.path.splitext(file_name)[0]
        # Replace hyphens/underscores with spaces, and replace "Subdivisions" with "Subdivision"
        clean_service_name = base_name.replace("-", " ").replace("_", " ").replace("Subdivisions", "Subdivision").strip()
        # Title case each word cleanly
        clean_service_name = " ".join([word[0].upper() + word[1:] if len(word) > 0 else "" for word in clean_service_name.split()])
        
        try:
            raw_sections = parse_txt_file(source_path)
            
            title = raw_sections.get('title', 'Service Title')
            body = raw_sections.get('body', '')
            steps = parse_steps(raw_sections.get('steps', ''))
            deliverables = parse_deliverables(raw_sections.get('deliverables', ''))
            faqs = parse_faqs(raw_sections.get('faqs', ''))
            
            # Generate SEO Description from title context
            clean_title_meta = title.replace('{{LOCATION_NAME}}', '').strip()
            description = f"Expert {clean_title_meta} services in {{{{LOCATION_NAME}}}}, ensuring accurate legal layout and strict municipal zoning compliance."
            
            # Helper to correctly indent multiline JSON inside the metadata code block
            def format_js_array(data_list):
                js_str = json.dumps(data_list, indent=2, ensure_ascii=False)
                return '\n'.join([('  ' + line if idx > 0 else line) for idx, line in enumerate(js_str.split('\n'))])

            # Escape quotes safely for YAML/Frontmatter and JSON scopes
            safe_title = title.replace('"', '\\"')
            safe_desc = description.replace('"', '\\"')
            safe_service_name = clean_service_name.replace('"', '\\"')

            mdx_template = f"""---
title: "{safe_title}"
description: "{safe_desc}"
locationName: '{{{{LOCATION_NAME}}}}'
heroImage: '{{{{HERO_IMAGE}}}}'
localAuthorityName: '{{{{LOCAL_AUTHORITY}}}}'
municipalLink: '{{{{MUNICIPAL_LINK}}}}'
serviceName: "{safe_service_name}"
---

import ServiceTemplate from '../../../templates/ServiceTemplate'

export const metadata = {{
  title: "{safe_title}",
  description: "{safe_desc}",
  locationName: '{{{{LOCATION_NAME}}}}',
  heroImage: '{{{{HERO_IMAGE}}}}',
  localAuthorityName: '{{{{LOCAL_AUTHORITY}}}}',
  municipalLink: '{{{{MUNICIPAL_LINK}}}}',
  serviceName: "{safe_service_name}",
  steps: {format_js_array(steps)},
  deliverables: {format_js_array(deliverables)},
  faqs: {format_js_array(faqs)},
  serviceLinks: {{{{SERVICE_LINKS}}}},
  locationLinks: {{{{LOCATION_LINKS}}}},
  serviceImages: {{{{SERVICE_IMAGES}}}},
  locationImages: {{{{LOCATION_IMAGES}}}}
}}

export default ({{ children }}) => (
  <ServiceTemplate {{...metadata}}>
    {{children}}
  </ServiceTemplate>
)

{body}
"""
            with open(output_path, 'w', encoding='utf-8') as out_f:
                out_f.write(mdx_template)
                
            print(f"SUCCESS Compiled: {file_name} -> {output_file_name}")
            
        except Exception as e:
            print(f"ERROR Failed compiling {file_name}: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    # Configure directories relative to repository root layout using os.path.dirname(os.path.abspath(__file__))
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(script_dir)
    SOURCE_FOLDER = os.path.join(base_dir, "src", "content", "base", "services", "text_files")
    OUTPUT_FOLDER = os.path.join(base_dir, "src", "content", "base", "services")
    
    # Ensure source folder exists for immediate use
    if not os.path.exists(SOURCE_FOLDER):
        os.makedirs(SOURCE_FOLDER)
        print(f"Created source folder path at '{SOURCE_FOLDER}'. Place your text files inside and run again.")
    else:
        convert_directory(SOURCE_FOLDER, OUTPUT_FOLDER)
