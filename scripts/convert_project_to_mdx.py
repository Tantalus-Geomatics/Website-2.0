import os
import re
import json
import sys

def clean_metadata_string(s):
    if not s:
        return ""
    # Strip out all Markdown asterisks (* and **)
    s = s.replace('*', '')
    # Strip out JSX/HTML tags like <span...>, </span>, etc.
    s = re.sub(r'<[^>]+>', '', s)
    return s.strip()

def format_image_path(img):
    img = img.strip()
    if not img:
        return ""
    if img.startswith('/') or img.startswith('http'):
        return img
    return f"/images/{img}"

def parse_txt_file(file_path):
    """
    Parses the custom structured text file into isolated content sections.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize line endings
    content = content.replace('\r\n', '\n')

    # Strip leading frontmatter if present
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if frontmatter_match:
        content = content[frontmatter_match.end():]

    # Identify the section headers using regex (robust to match variations in headers)
    header_pattern = re.compile(
        r'^(#+\s*\*{0,2}Title\*{0,2}|#+\s*\*{0,2}Client\*{0,2}|#+\s*\*{0,2}Location\*{0,2}|#+\s*\*{0,2}Completion\s+Date\*{0,2}|#+\s*\*{0,2}Hero\s+Image\*{0,2}|#+\s*\*{0,2}Gallery\s+Images\*{0,2}|#+\s*\*{0,2}Project\s+Scope\*{0,2}|#+\s*\*{0,2}Deliverables\*{0,2}|#+\s*\*{0,2}Body\*{0,2})', 
        re.MULTILINE | re.IGNORECASE
    )
    
    matches = list(header_pattern.finditer(content))
    sections = {}
    
    for i, match in enumerate(matches):
        start = match.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(content)
        # Clean section name to map into dictionary keys
        raw_key = match.group(1).replace('#', '').replace('*', '').strip().lower()
        
        # Normalize keys
        if 'title' in raw_key:
            section_key = 'title'
        elif 'client' in raw_key:
            section_key = 'client'
        elif 'location' in raw_key:
            section_key = 'location'
        elif 'completion' in raw_key:
            section_key = 'completionDate'
        elif 'hero' in raw_key:
            section_key = 'heroImage'
        elif 'gallery' in raw_key:
            section_key = 'galleryImages'
        elif 'scope' in raw_key:
            section_key = 'projectScope'
        elif 'deliverables' in raw_key:
            section_key = 'finalDeliverables'
        elif 'body' in raw_key:
            section_key = 'body'
        else:
            section_key = raw_key
            
        sections[section_key] = content[start:end].strip()

    return sections

def parse_bulleted_list(text):
    """
    Parses bulleted list into an array of strings, stripping markdown bold tags.
    """
    if not text:
        return []
    
    items = []
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove leading bullet symbols (*, -, +)
        line = re.sub(r'^[\*\-\+]\s*', '', line).strip()
        # Clean out bold asterisks for clean string inject
        line = clean_metadata_string(line)
        if line:
            items.append(line)
            
    return items

def parse_gallery_images(text):
    """
    Parses gallery images into an array of formatted image paths.
    """
    if not text:
        return []
    
    images = []
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove leading bullet symbols (*, -, +) if any
        line = re.sub(r'^[\*\-\+]\s*', '', line).strip()
        line = clean_metadata_string(line)
        if line:
            images.append(format_image_path(line))
            
    return images

def convert_directory(source_dir, output_dir):
    """
    Iterates through all .txt files in source_dir and converts them to .mdx in output_dir.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output folder: {output_dir}")

    txt_files = [f for f in os.listdir(source_dir) if f.endswith('.txt') and not f.startswith('_')]
    
    # Also include files starting with _ if they are explicitly requested or as fallback
    # but let's make sure we compile the example file too!
    all_txt_files = [f for f in os.listdir(source_dir) if f.endswith('.txt')]
    
    if not all_txt_files:
        print(f"No .txt files found in source folder '{source_dir}'.")
        return

    print(f"Found {len(all_txt_files)} source files. Starting compilation pipeline...")

    for file_name in all_txt_files:
        source_path = os.path.join(source_dir, file_name)
        
        # Determine clean URL slug out of filename (e.g., "Garibaldi Highlands.txt" -> "garibaldi-highlands.mdx")
        slug_name = os.path.splitext(file_name)[0].lower()
        if slug_name.startswith('_'):
            slug_name = slug_name[1:]
        slug_name = re.sub(r'[^a-z0-9]+', '-', slug_name).strip('-')
        output_file_name = f"{slug_name}.mdx"
        output_path = os.path.join(output_dir, output_file_name)
        
        try:
            raw_sections = parse_txt_file(source_path)
            
            title = clean_metadata_string(raw_sections.get('title', 'Project Title'))
            client = clean_metadata_string(raw_sections.get('client', ''))
            location = clean_metadata_string(raw_sections.get('location', 'British Columbia'))
            completion_date = clean_metadata_string(raw_sections.get('completionDate', ''))
            hero_image = format_image_path(clean_metadata_string(raw_sections.get('heroImage', '')))
            gallery_images = parse_gallery_images(raw_sections.get('galleryImages', ''))
            project_scope = parse_bulleted_list(raw_sections.get('projectScope', ''))
            final_deliverables = parse_bulleted_list(raw_sections.get('finalDeliverables', ''))
            body = raw_sections.get('body', '')
            
            # Auto-generate description
            description = f"A {location} land surveying project by Tantalus Geomatics: {title}."
            description = clean_metadata_string(description)
            
            # Helper to correctly indent multiline JSON inside the metadata code block
            def format_js_array(data_list):
                js_str = json.dumps(data_list, indent=2, ensure_ascii=False)
                return '\n'.join([('  ' + line if idx > 0 else line) for idx, line in enumerate(js_str.split('\n'))])

            # Escape quotes safely for YAML/Frontmatter and JSON scopes
            safe_title = title.replace('"', '\\"')
            safe_client = client.replace('"', '\\"')
            safe_location = location.replace('"', '\\"')
            safe_completion_date = completion_date.replace('"', '\\"')
            safe_hero_image = hero_image.replace('"', '\\"')
            safe_desc = description.replace('"', '\\"')

            mdx_template = f"""---
title: "{safe_title}"
client: "{safe_client}"
location: "{safe_location}"
completionDate: "{safe_completion_date}"
heroImage: "{safe_hero_image}"
galleryImages: {json.dumps(gallery_images, ensure_ascii=False)}
projectScope: {json.dumps(project_scope, ensure_ascii=False)}
finalDeliverables: {json.dumps(final_deliverables, ensure_ascii=False)}
description: "{safe_desc}"
---

export const metadata = {{
  title: "{safe_title}",
  client: "{safe_client}",
  location: "{safe_location}",
  completionDate: "{safe_completion_date}",
  heroImage: "{safe_hero_image}",
  galleryImages: {format_js_array(gallery_images)},
  projectScope: {format_js_array(project_scope)},
  finalDeliverables: {format_js_array(final_deliverables)},
  description: "{safe_desc}",
}}

export default function Content({{ children }}) {{ return <>{{children}}</> }}

{body}
"""
            with open(output_path, 'w', encoding='utf-8') as out_f:
                # Normalize any "the the" (case-insensitive) to a single "the"
                previous_template = None
                while previous_template != mdx_template:
                    previous_template = mdx_template
                    mdx_template = re.sub(r'\b(the)\s+the\b', r'\1', mdx_template, flags=re.IGNORECASE)
                out_f.write(mdx_template)
                
            print(f"SUCCESS Compiled: {file_name} -> {output_file_name}")
            
        except Exception as e:
            print(f"ERROR Failed compiling {file_name}: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.dirname(script_dir)
    SOURCE_FOLDER = os.path.join(base_dir, "src", "content", "base", "projects", "text_files")
    OUTPUT_FOLDER = os.path.join(base_dir, "src", "content", "base", "projects")
    
    # Ensure source folder exists for immediate use
    if not os.path.exists(SOURCE_FOLDER):
        os.makedirs(SOURCE_FOLDER)
        print(f"Created source folder path at '{SOURCE_FOLDER}'. Place your text files inside and run again.")
    else:
        convert_directory(SOURCE_FOLDER, OUTPUT_FOLDER)
