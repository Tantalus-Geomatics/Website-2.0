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
        r'^(#+\s*\*{0,2}Title\*{0,2}|#+\s*\*{0,2}Description\*{0,2}|#+\s*\*{0,2}Publish\s+Date\*{0,2}|#+\s*\*{0,2}Tags\*{0,2}|#+\s*\*{0,2}Hero\s+Image\*{0,2}|#+\s*\*{0,2}Body\*{0,2}|#+\s*\*{0,2}Glossary\*{0,2})', 
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
        elif 'description' in raw_key:
            section_key = 'description'
        elif 'publish' in raw_key:
            section_key = 'publishDate'
        elif 'tags' in raw_key:
            section_key = 'tags'
        elif 'hero' in raw_key:
            section_key = 'heroImage'
        elif 'body' in raw_key:
            section_key = 'body'
        elif 'glossary' in raw_key:
            section_key = 'glossary'
        else:
            section_key = raw_key
            
        sections[section_key] = content[start:end].strip()

    return sections

def parse_tags(text):
    """
    Parses tags into an array of strings, supporting comma-separated or one per line.
    """
    if not text:
        return []
    
    tags = []
    # If there are commas, split by comma
    if ',' in text:
        parts = text.split(',')
    else:
        # Otherwise split by newline
        parts = text.split('\n')
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
        # Strip bullet points if any
        part = re.sub(r'^[\*\-\+]\s*', '', part).strip()
        part = clean_metadata_string(part)
        if part:
            tags.append(part)
            
    return tags

def parse_glossary(text):
    """
    Parses glossary section into an array of dicts: [{"term": "...", "definition": "..."}]
    Each line is formatted as: **{Term}** {Definition}
    """
    if not text:
        return []
    
    terms = []
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Match **{Term}** {Definition}
        match = re.match(r'^\s*\*\*(.*?)\*\*\s*(.*)$', line)
        if match:
            term = match.group(1).strip()
            definition = match.group(2).strip()
            terms.append({
                "term": term,
                "definition": definition
            })
    return terms

def parse_directives(body_text):
    # Regex to find [[image: ...]]
    def replace_image(match):
        content = match.group(1).strip()
        parts = content.split('|')
        filename = parts[0].strip()
        
        float_val = "none"
        width_val = 100
        caption_val = None
        
        for part in parts[1:]:
            part = part.strip()
            if not part:
                continue
            if ':' in part:
                k, v = part.split(':', 1)
                k = k.strip().lower()
                v = v.strip()
                if k == 'float':
                    float_val = v.lower()
                elif k == 'width':
                    width_match = re.search(r'\d+', v)
                    if width_match:
                        width_val = int(width_match.group())
                elif k == 'caption':
                    if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                        v = v[1:-1]
                    caption_val = v
                    
        jsx = f'<RichImage src="{filename}" float="{float_val}" width={{{width_val}}}'
        if caption_val is not None:
            safe_caption = caption_val.replace('"', '\\"')
            jsx += f' caption="{safe_caption}"'
        jsx += ' />'
        return jsx

    # Regex to find [[map: ...]]
    def replace_map(match):
        content = match.group(1).strip()
        parts = content.split('|')
        coords = parts[0].strip()
        
        lat, lng = 0.0, 0.0
        if ',' in coords:
            try:
                lat_str, lng_str = coords.split(',', 1)
                lat = float(lat_str.strip())
                lng = float(lng_str.strip())
            except ValueError:
                pass
                
        zoom_val = 14
        height_val = 320
        
        for part in parts[1:]:
            part = part.strip()
            if not part:
                continue
            if ':' in part:
                k, v = part.split(':', 1)
                k = k.strip().lower()
                v = v.strip()
                if k == 'zoom':
                    zoom_match = re.search(r'\d+', v)
                    if zoom_match:
                        zoom_val = int(zoom_match.group())
                elif k == 'height':
                    height_match = re.search(r'\d+', v)
                    if height_match:
                        height_val = int(height_match.group())
                        
        return f'<RichMap lat={{{lat}}} lng={{{lng}}} zoom={{{zoom_val}}} height={{{height_val}}} />'

    # Regex to find [[video: ...]]
    def replace_video(match):
        content = match.group(1).strip()
        parts = content.split('|')
        url_val = parts[0].strip()
        
        width_val = 100
        caption_val = None
        
        for part in parts[1:]:
            part = part.strip()
            if not part:
                continue
            if ':' in part:
                k, v = part.split(':', 1)
                k = k.strip().lower()
                v = v.strip()
                if k == 'width':
                    width_match = re.search(r'\d+', v)
                    if width_match:
                        width_val = int(width_match.group())
                elif k == 'caption':
                    if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                        v = v[1:-1]
                    caption_val = v
                    
        jsx = f'<RichVideo url="{url_val}" width={{{width_val}}}'
        if caption_val is not None:
            safe_caption = caption_val.replace('"', '\\"')
            jsx += f' caption="{safe_caption}"'
        jsx += ' />'
        return jsx

    # Replace [[image: ...]]
    body_text = re.sub(r'\[\[\s*image:\s*(.*?[^\]]*?)\s*\]\]', replace_image, body_text, flags=re.IGNORECASE)
    # Replace [[map: ...]]
    body_text = re.sub(r'\[\[\s*map:\s*(.*?[^\]]*?)\s*\]\]', replace_map, body_text, flags=re.IGNORECASE)
    # Replace [[video: ...]]
    body_text = re.sub(r'\[\[\s*video:\s*(.*?[^\]]*?)\s*\]\]', replace_video, body_text, flags=re.IGNORECASE)
    
    return body_text

def convert_directory(source_dir, output_dir):
    """
    Iterates through all .txt files in source_dir and converts them to .mdx in output_dir.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output folder: {output_dir}")

    all_txt_files = [f for f in os.listdir(source_dir) if f.endswith('.txt')]
    
    if not all_txt_files:
        print(f"No .txt files found in source folder '{source_dir}'.")
        return

    print(f"Found {len(all_txt_files)} source files. Starting compilation pipeline...")

    for file_name in all_txt_files:
        source_path = os.path.join(source_dir, file_name)
        
        # Determine clean URL slug out of filename (e.g., "What Is A Section 219.txt" -> "what-is-a-section-219.mdx")
        slug_name = os.path.splitext(file_name)[0].lower()
        if slug_name.startswith('_'):
            slug_name = slug_name[1:]
        slug_name = re.sub(r'[^a-z0-9]+', '-', slug_name).strip('-')
        output_file_name = f"{slug_name}.mdx"
        output_path = os.path.join(output_dir, output_file_name)
        
        try:
            raw_sections = parse_txt_file(source_path)
            
            title = clean_metadata_string(raw_sections.get('title', 'Insight Title'))
            description = clean_metadata_string(raw_sections.get('description', ''))
            publish_date = clean_metadata_string(raw_sections.get('publishDate', ''))
            tags = parse_tags(raw_sections.get('tags', ''))
            hero_image = format_image_path(clean_metadata_string(raw_sections.get('heroImage', '')))
            body = parse_directives(raw_sections.get('body', ''))
            glossary = parse_glossary(raw_sections.get('glossary', ''))
            
            # Helper to correctly indent multiline JSON inside the metadata code block
            def format_js_array(data_list):
                js_str = json.dumps(data_list, indent=2, ensure_ascii=False)
                return '\n'.join([('  ' + line if idx > 0 else line) for idx, line in enumerate(js_str.split('\n'))])

            # Escape quotes safely for YAML/Frontmatter and JSON scopes
            safe_title = title.replace('"', '\\"')
            safe_desc = description.replace('"', '\\"')
            safe_publish_date = publish_date.replace('"', '\\"')
            safe_hero_image = hero_image.replace('"', '\\"')

            mdx_template = f"""---
title: "{safe_title}"
description: "{safe_desc}"
publishDate: "{safe_publish_date}"
tags: {json.dumps(tags, ensure_ascii=False)}
heroImage: "{safe_hero_image}"
glossary: {json.dumps(glossary, ensure_ascii=False)}
---

export const metadata = {{
  title: "{safe_title}",
  description: "{safe_desc}",
  publishDate: "{safe_publish_date}",
  tags: {format_js_array(tags)},
  heroImage: "{safe_hero_image}",
  glossary: {format_js_array(glossary)},
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
    SOURCE_FOLDER = os.path.join(base_dir, "src", "content", "base", "blog", "text_files")
    OUTPUT_FOLDER = os.path.join(base_dir, "src", "content", "base", "blog")
    
    # Ensure source folder exists for immediate use
    if not os.path.exists(SOURCE_FOLDER):
        os.makedirs(SOURCE_FOLDER)
        print(f"Created source folder path at '{SOURCE_FOLDER}'. Place your text files inside and run again.")
    else:
        convert_directory(SOURCE_FOLDER, OUTPUT_FOLDER)
