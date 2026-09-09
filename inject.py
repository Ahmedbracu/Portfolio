import sys

def main():
    with open('app/page.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if "{/* Other sections follow similar FadeInSection" in line:
            start_idx = i
        if "</section>" in line and 'id="contact"' in lines[i-18] if i >= 18 else False: # Need to find the end of the contact section
            pass # this is brittle
            
    # Better logic:
    # find "{/* Other sections follow similar FadeInSection"
    # find the next "</section>" which is the end of contact section.
    
    start_idx = -1
    for i, line in enumerate(lines):
        if "{/* Other sections follow similar FadeInSection" in line:
            start_idx = i
            break
            
    if start_idx == -1:
        print("Could not find start idx")
        return
        
    end_idx = -1
    for i in range(start_idx, len(lines)):
        if "</section>" in lines[i]:
            end_idx = i
            break

    with open('missing_sections.tsx', 'r', encoding='utf-8') as f:
        missing_content = f.read()
        
    # Replace the lines from start_idx to end_idx with missing_content
    new_lines = lines[:start_idx] + [missing_content + "\n"] + lines[end_idx+1:]
    
    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        
    print("Done splicing")

if __name__ == '__main__':
    main()
