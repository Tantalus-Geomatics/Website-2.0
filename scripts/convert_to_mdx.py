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


def parse_txt_file(file_path):
    """
    Parses the custom structured text file into isolated content sections.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize line endings
    content = content.replace('\r\n', '\n')

    # Identify the section headers using regex (robust to match variations in headers)
    header_pattern = re.compile(
        r'^(#+\s*\*\*?Title\*\*?|#+\s*\*\*?Body\*\*?|#+\s*\*\*?Steps\*\*?|#+\s*\*\*?Deliverables(?:\s+section)?\*\*?|#+\s*\*\*?FAQs?(?:\s+section)?\*\*?)', 
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
        elif 'body' in raw_key:
            section_key = 'body'
        elif 'steps' in raw_key:
            section_key = 'steps'
        elif 'deliverables' in raw_key:
            section_key = 'deliverables'
        elif 'faq' in raw_key:
            section_key = 'faqs'
        else:
            section_key = raw_key
            
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
            title = clean_metadata_string(match.group(1))
            description = clean_metadata_string(match.group(2))
            # Flatten multi-line description into clean single-spaced layout
            description = re.sub(r'\s+', ' ', description)
            steps.append({"title": title, "description": description})
        else:
            steps.append({"title": "Process Step", "description": clean_metadata_string(re.sub(r'\s+', ' ', block))})
            
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
        line = clean_metadata_string(line)
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
    # Find the start positions of each FAQ item
    item_starts = [m.start() for m in re.finditer(r'(?:^|\n)\s*\*?\*?\d+[\.\\\s]+', faqs_text)]
    if not item_starts:
        item_starts = [m.start() for m in re.finditer(r'\*\*?\d+[\.\\\s]+', faqs_text)]
        
    blocks = []
    for i in range(len(item_starts)):
        start = item_starts[i]
        end = item_starts[i+1] if i+1 < len(item_starts) else len(faqs_text)
        blocks.append(faqs_text[start:end].strip())
        
    for block in blocks:
        if not block:
            continue
            
        prefix_match = re.match(r'^\s*\*?\*?\d+[\.\\\s]+', block)
        if not prefix_match:
            continue
            
        prefix = prefix_match.group(0)
        remaining = block[len(prefix):].strip()
        
        question = ""
        answer = ""
        
        if '**' in remaining:
            parts = remaining.split('**', 1)
            question = parts[0].strip()
            answer = parts[1].strip()
        elif '*' in remaining:
            parts = remaining.split('*', 1)
            question = parts[0].strip()
            answer = parts[1].strip()
        else:
            if '?' in remaining:
                parts = remaining.split('?', 1)
                question = parts[0].strip() + '?'
                answer = parts[1].strip()
            else:
                parts = remaining.split('\n', 1)
                question = parts[0].strip()
                answer = parts[1].strip() if len(parts) > 1 else ""
                
        question = clean_metadata_string(question)
        answer = clean_metadata_string(answer)
        
        # Standardize extra spaces inside paragraphs and join multi-line blocks
        question = re.sub(r'\s+', ' ', question).strip()
        answer = re.sub(r'\s+', ' ', answer).strip()
        
        if question:
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
            if not title or title == 'Service Title':
                title = f"{clean_service_name} in <span className=\"text-brand-green font-semibold\">{{{{LOCATION_NAME}}}}</span>"
            
            body = raw_sections.get('body', '')
            steps = parse_steps(raw_sections.get('steps', ''))
            deliverables = parse_deliverables(raw_sections.get('deliverables', ''))
            faqs = parse_faqs(raw_sections.get('faqs', ''))
            
            # Generate SEO Description from title context
            clean_title_meta = title.replace('{{LOCATION_NAME}}', '').strip()
            # Strip out HTML tags from clean_title_meta before putting it in description
            clean_title_meta = clean_metadata_string(clean_title_meta)
            # Remove trailing "in" if present
            clean_title_meta = re.sub(r'\s+in\s*$', '', clean_title_meta, flags=re.IGNORECASE)

            # Master dictionary linking specific, high-intent suffixes to eliminate generic boilerplate text
            SERVICE_DESCRIPTION_SUFFIXES = {
                # Advanced Mapping, Monitoring & Reality Capture
                "3D Settlement Monitoring": "deploying millimeter-accurate monitoring networks to track structural shifts, shoring deflections, and ground movements throughout construction.",
                "Terrestrial Lidar Scanning": "capturing high-density digital twins and millimeter-accurate 3D point clouds of complex architectural facades, mechanical plants, and civil works.",
                "Terrestrial LiDAR Scanning": "capturing high-density digital twins and millimeter-accurate 3D point clouds of complex architectural facades, mechanical plants, and civil works.",
                "Uav Mapping": "deploying aerial photogrammetry and LiDAR sensors to safely map large-scale, steep, or inaccessible areas.",
                "UAV Mapping": "deploying aerial photogrammetry and LiDAR sensors to safely map large-scale, steep, or inaccessible areas.",
                
                # Land Partitions, Subdivisions & Strata Layouts
                "Air Space Subdivision Surveys": "defining independent three-dimensional volumetric parcels for complex multi-use developments, rights allocations, and shared infrastructure ownership.",
                "Bare Land Strata Surveys": "defining legal boundaries, strata roads, and utility corridors for strata communities.",
                "Building Strata Surveys": "defining the legal extents of individual strata lots, common property, and limited common property within multi-unit developments.",
                "Phased Strata Surveys": "boundary surveys, construction support and legal filings for multi-phase strata developments.",
                "Proposed Strata Plans": "preliminary strata lot boundaries and floor areas from architectural drawings to support pre-construction sales and disclosures.",
                "Strata Plan Amendment Surveys": "re-surveying altered building layouts, strata lot boundary adjustments, or common property allocations to update registered strata plans.",
                "Strata Surveys": "creating strata lots, common property and limited common property to define ownership boundaries within strata-titled residential or commercial developments.",
                "Subdivision Surveys": "guiding land developers through the process of subdividing large parcels, boundary adjustments, and greenfield developments from initial design up to final Land Title Office filing.",
                
                # Boundaries & Property Legal Assessments
                "BC Land Surveyors Building Location Surveys": "producing certified plans confirming foundations and structural improvements conform to legal property lines and municipal setback regulations.",
                "Block Outline Surveys": "establishing high-precision legal control networks to raise title before you build.",
                "Boundary Surveys": "re-establishing original survey monuments to mark legal boundaries ahead of major structural landscaping or home renovations.",
                "Consolidation Surveys": "combining multiple adjacent parcels into a single unified parcel to maximize municipal zoning advantages and site footprints.",
                "Topographic Surveys And Site Plans": "mapping detailed ground elevations, structural contours, visible utility networks, and landmarks to anchor architectural design blueprints.",
                
                # Rights, Easements & Environmental Constraints
                "Covenant Surveys": "defining protected areas, environmental limits, or development constraints required to register restrictive covenants on land titles.",
                "Easement Surveys": "defining the extent of rights of one parcel over another.",
                "Land Act Surveys": "legal surveys for Crown land tenures, roads, resource boundaries, or provincial property transfers.",
                "Natural Boundary Surveys": "identifying riparian setbacks, high-water marks, present natural boundaries and changes due to accretion or erosion limits.",
                "Statutory Rights Of Way Surveys": "surveying corridor lines for public infrastructure networks or utility lines required for formal LTSA documentation.",
                
                # Site Civil Layouts, Controls & Calculations
                "Excavation Layout Surveys": "marking dig limits, shoring alignments, and precise vertical benchmarks to guide heavy site machine operators safely.",
                "Form And Foundation Surveys": "certifying concrete formwork layouts and foundation as-builts to demonstrate conformity with municipal regulations before pouring concrete.",
                "Gridline And Construction Layout Surveys": "translating complex architectural site designs into a physical layout in the real world.",
                "Infrastructure Layout And Construction Surveys": "providing dimension control systems for complex civil engineering works, municipal utilities, and roadway development grids.",
                "Road Surveys": "establishing legal boundaries, alignments, horizontal curves, and geometric layouts for strata roads, forest service roads, access roads or highways.",
                "Volume And Earthwork Surveys": "quantifying material changes, grading results, and cut-and-fill balances to optimize mass-haul site logistics and financial tracking."
            }

            # Gather custom details based on matched titles, default elegantly to catch-all if unlisted
            custom_suffix = SERVICE_DESCRIPTION_SUFFIXES.get(
                clean_title_meta, 
                "delivering certified legal boundary definitions, advanced geomatics positioning, and professional municipal development compliance mapping."
            )

            # Build structural geocentric text block line
            description = f"Professional {clean_title_meta} in {{{{LOCATION_NAME}}}}, {custom_suffix}"
            description = clean_metadata_string(description)
            
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
                # Normalize any "the the" (case-insensitive) to a single "the" (preserving the case of the first one)
                previous_template = None
                while previous_template != mdx_template:
                    previous_template = mdx_template
                    mdx_template = re.sub(r'\b(the)\s+the\b', r'\1', mdx_template, flags=re.IGNORECASE)
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