#!/usr/bin/env python3
"""
Générateur de CV PDF officiel pour Narindra Rackoto
Construit un fichier PDF 1.4 pur et standard sans dépendance externe.
"""
import zlib
import os

class SimplePDF:
    def __init__(self):
        self.objects = []
        self.pages = []
        self.page_contents = []

    def add_object(self, content):
        self.objects.append(content)
        return len(self.objects)

    def new_page(self):
        self.page_contents.append([])
        return len(self.page_contents) - 1

    def add_content(self, page_idx, stream_text):
        self.page_contents[page_idx].append(stream_text)

    def write_pdf(self, output_path):
        # We need standard fonts: Helvetica, Helvetica-Bold, Helvetica-Oblique
        # 1: Catalog -> /Pages 2 0 R
        # 2: Pages -> Kids [...] Count N
        # 3: Font F1 (Helvetica)
        # 4: Font F2 (Helvetica-Bold)
        # 5: Font F3 (Helvetica-Oblique)
        
        objects = []
        
        # Object 1: Catalog
        catalog_obj = "<< /Type /Catalog /Pages 2 0 R >>"
        objects.append(catalog_obj)
        
        # Object 2 will be Pages (we will update kids later)
        # Object 3, 4, 5 are Fonts
        font_f1 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
        font_f2 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
        font_f3 = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>"
        
        objects.append("") # Placeholder for Pages (idx 1 -> obj 2)
        objects.append(font_f1) # idx 2 -> obj 3
        objects.append(font_f2) # idx 3 -> obj 4
        objects.append(font_f3) # idx 4 -> obj 5
        
        page_obj_ids = []
        
        # For each page, we create a Page object and a Contents stream object
        curr_obj_id = 6
        for p_idx, stream_parts in enumerate(self.page_contents):
            full_stream = "\n".join(stream_parts).encode('latin1', 'replace')
            compressed = zlib.compress(full_stream)
            
            page_id = curr_obj_id
            content_id = curr_obj_id + 1
            curr_obj_id += 2
            
            page_obj_ids.append(page_id)
            
            page_def = f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> /ProcSet [/PDF /Text /ImageB /ImageC /ImageI] >> /Contents {content_id} 0 R >>"
            stream_def = f"<< /Length {len(compressed)} /Filter /FlateDecode >>\nstream\n"
            
            objects.append(page_def) # page_id
            objects.append((stream_def, compressed)) # content_id
            
        # Now fill Pages object (obj 2)
        kids_str = " ".join([f"{pid} 0 R" for pid in page_obj_ids])
        pages_def = f"<< /Type /Pages /Kids [{kids_str}] /Count {len(page_obj_ids)} >>"
        objects[1] = pages_def
        
        # Write binary PDF
        with open(output_path, "wb") as f:
            f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
            xref = []
            xref.append(0) # 0000000000 65535 f
            
            for i, obj in enumerate(objects):
                offset = f.tell()
                xref.append(offset)
                obj_num = i + 1
                f.write(f"{obj_num} 0 obj\n".encode('ascii'))
                if isinstance(obj, tuple):
                    head, data = obj
                    f.write(head.encode('ascii'))
                    f.write(data)
                    f.write(b"\nendstream\n")
                else:
                    f.write(obj.encode('latin1'))
                    f.write(b"\n")
                f.write(b"endobj\n")
                
            xref_offset = f.tell()
            f.write(b"xref\n")
            f.write(f"0 {len(objects) + 1}\n".encode('ascii'))
            f.write(b"0000000000 65535 f \n")
            for offset in xref[1:]:
                f.write(f"{offset:010d} 00000 n \n".encode('ascii'))
                
            f.write(b"trailer\n")
            trailer = f"<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n"
            f.write(trailer.encode('ascii'))

def escape_pdf(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def build_narindra_cv():
    pdf = SimplePDF()
    
    # ================= PAGE 1 =================
    p1 = pdf.new_page()
    
    # Left accent banner / header bar (Electric Blue / Dark Navy Theme)
    # A4 dimensions: 595.28 x 841.89
    stream1 = []
    
    # Top banner background
    stream1.append("0.04 0.07 0.14 rg") # Dark navy (#0a1124)
    stream1.append("0 720 595.28 122 re f")
    
    # Accent cyan line
    stream1.append("0.22 0.74 0.97 rg") # Cyan (#38bdf8)
    stream1.append("0 717 595.28 3 re f")
    
    # Name in white bold
    stream1.append("BT")
    stream1.append("/F2 22 Tf")
    stream1.append("1 1 1 rg") # White
    stream1.append("40 802 Td")
    stream1.append(f"({escape_pdf('Narindra Rackoto (Narindranjanahary RAKOTONINDRINA)')}) Tj")
    stream1.append("ET")
    
    # Title in electric cyan
    stream1.append("BT")
    stream1.append("/F2 11 Tf")
    stream1.append("0.22 0.74 0.97 rg") # Cyan
    stream1.append("40 782 Td")
    stream1.append(f"({escape_pdf('INGENIEUR EN INFORMATIQUE  |  DEVELOPPEUR FULL STACK  |  IA & AUTOMATISATION')}) Tj")
    stream1.append("ET")
    
    # Sub-badge: Master ENI Nov 2026
    stream1.append("BT")
    stream1.append("/F2 9.5 Tf")
    stream1.append("0.7 0.85 1 rg")
    stream1.append("40 763 Td")
    stream1.append(f"({escape_pdf('Master Professionnel en Informatique (ENI Fianarantsoa, Madagascar - Nov. 2026)')}) Tj")
    stream1.append("ET")
    
    # Contact row
    stream1.append("BT")
    stream1.append("/F1 8.5 Tf")
    stream1.append("0.85 0.9 0.98 rg")
    stream1.append("40 740 Td")
    stream1.append(f"({escape_pdf('Madagascar  |  contact@narindra-rackoto.dev  |  github.com/rackoto786  |  linkedin.com/in/narindra-rackoto-98222a3a6')}) Tj")
    stream1.append("ET")
    
    # SECTION 1: PROFIL PROFESSIONNEL
    y = 690
    def draw_section_title(stream, title, cur_y):
        stream.append("0.15 0.38 0.92 rg") # Electric Blue box
        stream.append(f"40 {cur_y - 2} 4 14 re f")
        stream.append("BT")
        stream.append("/F2 12 Tf")
        stream.append("0.06 0.1 0.2 rg") # Deep navy text
        stream.append(f"50 {cur_y} Td")
        stream.append(f"({escape_pdf(title.upper())}) Tj")
        stream.append("ET")
        # subtle divider line
        stream.append("0.85 0.88 0.92 rg")
        stream.append(f"40 {cur_y - 8} 515 0.75 re f")
        return cur_y - 24

    y = draw_section_title(stream1, "Profil Professionnel & Synthèse", y)
    
    # Bio text
    bio_lines = [
        "Developpeur passionne par l'intelligence artificielle et les nouvelles technologies, je suis diplome d'un Master",
        "professionnel en Informatique (parcours Informatique Generale) obtenu en novembre 2026 a l'Ecole Nationale",
        "d'Informatique (ENI) de Fianarantsoa, Madagascar.",
        "Polyvalent, methodique et autonome, je concois des solutions logicielles Full Stack performantes, des architectures",
        "PWA, des modeles de bases de donnees robustes et des automatisations intelligentes adaptees aux besoins reels des organisations."
    ]
    stream1.append("BT")
    stream1.append("/F1 9 Tf")
    stream1.append("0.2 0.25 0.3 rg")
    stream1.append(f"40 {y} Td")
    stream1.append("13.5 TL") # line height
    for line in bio_lines:
        stream1.append(f"({escape_pdf(line)}) Tj T*")
    stream1.append("ET")
    y -= 78

    # SECTION 2: PROJET PHARE & EXPERIENCES
    y = draw_section_title(stream1, "Experiences Professionnelles & Projet Phare", y)
    
    # FIARAmotion Highlight Card Box
    stream1.append("0.96 0.98 1 rg") # soft blue background
    stream1.append(f"40 {y - 128} 515 136 re f")
    stream1.append("0.22 0.74 0.97 rg") # border
    stream1.append(f"40 {y - 128} 515 136 re s")
    
    # Title FIARAmotion
    stream1.append("BT")
    stream1.append("/F2 11 Tf")
    stream1.append("0.05 0.25 0.65 rg")
    stream1.append(f"50 {y - 6} Td")
    stream1.append(f"({escape_pdf('PROJET PHARE : FIARAmotion - Plateforme de pilotage de parc roulant')}) Tj")
    stream1.append("ET")
    
    stream1.append("BT")
    stream1.append("/F3 9 Tf")
    stream1.append("0.2 0.5 0.7 rg")
    stream1.append(f"50 {y - 20} Td")
    stream1.append(f"({escape_pdf('Stage Professionnel de Master  |  Programme CERES, Madagascar  |  Stack: React.js, TypeScript, Python Flask, PostgreSQL, PWA')}) Tj")
    stream1.append("ET")
    
    fiaramotion_bullets = [
        "- Solution numerique multiplateforme concue pour la gestion et le pilotage operationnel et financier d'un parc automobile.",
        "- Architecture decouplee : Frontend PWA React/TypeScript (mode terrain & bureau) + Backend REST API Python/Flask + PostgreSQL.",
        "- Matrice RBAC de 5 profils utilisateurs : Administrateur, Chargee technique, Collaborateur, Conducteur, Direction.",
        "- 11 modules developpes : vehicules, chauffeurs, missions, calendrier, entretiens, carburant, indicateurs financiers/KPIs.",
        "- Resultats : Centralisation integrale, tracabilite des depenses et prevention active des immobilisations techniques."
    ]
    stream1.append("BT")
    stream1.append("/F1 8.5 Tf")
    stream1.append("0.15 0.2 0.25 rg")
    stream1.append(f"50 {y - 36} Td")
    stream1.append("12.5 TL")
    for b in fiaramotion_bullets:
        stream1.append(f"({escape_pdf(b)}) Tj T*")
    stream1.append("ET")
    y -= 144

    # Experience 2: FID Ambositra
    fid_title = escape_pdf("FID (Fonds d'Intervention pour le Developpement) - Ambositra, Madagascar")
    fid_sub = escape_pdf("Developpeur d'Application & Support Informatique  |  Projet de gestion de parc roulant avec Django")
    stream1.append("BT")
    stream1.append("/F2 10 Tf")
    stream1.append("0.1 0.15 0.25 rg")
    stream1.append(f"40 {y} Td")
    stream1.append(f"({fid_title}) Tj")
    stream1.append("ET")
    
    stream1.append("BT")
    stream1.append("/F3 8.5 Tf")
    stream1.append("0.35 0.4 0.5 rg")
    stream1.append(f"40 {y - 13} Td")
    stream1.append(f"({fid_sub}) Tj")
    stream1.append("ET")
    
    fid_bullets = [
        "- Conception et developpement d'une application web avec le framework Django dediee a la gestion du parc de vehicules.",
        "- Participation active au support technique des utilisateurs, maintenance preventive et curative du parc de machines."
    ]
    stream1.append("BT")
    stream1.append("/F1 8.5 Tf")
    stream1.append("0.2 0.25 0.3 rg")
    stream1.append(f"40 {y - 27} Td")
    stream1.append("12 TL")
    for b in fid_bullets:
        stream1.append(f"({escape_pdf(b)}) Tj T*")
    stream1.append("ET")
    y -= 58

    # Experience 3: CHU / CHUA Fianarantsoa
    stream1.append("BT")
    stream1.append("/F2 10 Tf")
    stream1.append("0.1 0.15 0.25 rg")
    stream1.append(f"40 {y} Td")
    stream1.append(f"({escape_pdf('CHU / CHUA (Centre Hospitalier Universitaire) - Fianarantsoa, Madagascar')}) Tj")
    stream1.append("ET")
    
    stream1.append("BT")
    stream1.append("/F3 8.5 Tf")
    stream1.append("0.35 0.4 0.5 rg")
    stream1.append(f"40 {y - 13} Td")
    stream1.append(f"({escape_pdf('Stagiaire / Technicien Systemes, Reseaux & Securite Informatique')}) Tj")
    stream1.append("ET")
    
    chu_bullets = [
        "- Administration et configuration des equipements reseaux et politiques de filtrage web securise.",
        "- Supervision continue de l'infrastructure informatique et assistance pour garantir la haute disponibilite hospitaliere."
    ]
    stream1.append("BT")
    stream1.append("/F1 8.5 Tf")
    stream1.append("0.2 0.25 0.3 rg")
    stream1.append(f"40 {y - 27} Td")
    stream1.append("12 TL")
    for b in chu_bullets:
        stream1.append(f"({escape_pdf(b)}) Tj T*")
    stream1.append("ET")
    y -= 58

    # SECTION 3: FORMATION ACADEMIQUE
    y = draw_section_title(stream1, "Formation Academique (ENI Fianarantsoa)", y)
    
    edu_list = [
        ("2026", "Master professionnel en Informatique - Parcours Informatique Generale", "ENI Fianarantsoa - Diplome obtenu en Novembre 2026", True),
        ("2025", "Premiere annee de Master professionnel (M1) - Informatique Generale", "Ecole Nationale d'Informatique (ENI) - Annee validee", False),
        ("2024", "Licence professionnelle en Informatique - Genie Logiciel & SI", "Ecole Nationale d'Informatique (ENI) - Diplome obtenu", False),
        ("2021-2023", "Formation en Licence professionnelle - Cycle informatique", "Ecole Nationale d'Informatique (ENI) - Cycle valide", False),
        ("2020", "Baccalaureat Serie C (Scientifique - Mathematiques & Physiques)", "Enseignement Secondaire, Madagascar - Diplome obtenu", False),
    ]
    
    for year, title, subtitle, is_master in edu_list:
        stream1.append("BT")
        stream1.append(f"/F2 {9 if is_master else 8.5} Tf")
        stream1.append("0.05 0.3 0.7 rg" if is_master else "0.15 0.2 0.25 rg")
        stream1.append(f"40 {y} Td")
        stream1.append(f"({escape_pdf(year + ' : ' + title)}) Tj")
        stream1.append("ET")
        
        stream1.append("BT")
        stream1.append("/F3 8 Tf")
        stream1.append("0.4 0.45 0.5 rg")
        stream1.append(f"40 {y - 11} Td")
        stream1.append(f"({escape_pdf(subtitle)}) Tj")
        stream1.append("ET")
        y -= 25

    # Footer note page 1
    stream1.append("BT")
    stream1.append("/F1 8 Tf")
    stream1.append("0.5 0.55 0.6 rg")
    stream1.append("40 25 Td")
    stream1.append(f"({escape_pdf('Narindra Rackoto - Ingenieur en informatique | Master ENI 2026  --  Page 1 / 2')}) Tj")
    stream1.append("ET")
    
    pdf.add_content(p1, "\n".join(stream1))
    
    # ================= PAGE 2 =================
    p2 = pdf.new_page()
    stream2 = []
    
    # Top header banner page 2 (thinner)
    stream2.append("0.04 0.07 0.14 rg")
    stream2.append("0 780 595.28 62 re f")
    stream2.append("0.22 0.74 0.97 rg")
    stream2.append("0 777 595.28 3 re f")
    
    stream2.append("BT")
    stream2.append("/F2 13 Tf")
    stream2.append("1 1 1 rg")
    stream2.append("40 805 Td")
    stream2.append(f"({escape_pdf('Narindra Rackoto - Competences Techniques & Methodologie')}) Tj")
    stream2.append("ET")
    
    stream2.append("BT")
    stream2.append("/F1 9 Tf")
    stream2.append("0.7 0.85 1 rg")
    stream2.append("40 789 Td")
    stream2.append(f"({escape_pdf('Ingenieur Full Stack  *  Intelligence Artificielle & Automatisation  *  Systemes & Reseaux')}) Tj")
    stream2.append("ET")
    
    y = 745
    y = draw_section_title(stream2, "Competences Techniques Detailles (Sans Pourcentages Artificiels)", y)
    
    skill_blocks = [
        ("Developpement Frontend", "React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Progressive Web Apps (PWA)"),
        ("Developpement Backend", "Python, Flask (REST APIs & Blueprints), Django (MVC & Auth), Node.js, Express.js"),
        ("Bases de Donnees", "PostgreSQL (SGBD Relationnel avance, indexation, ACID), MySQL, SQL (Modelisation, jointures, procedures)"),
        ("Intelligence Artificielle & Data", "Python (Data Science), Pandas, NumPy, Scikit-learn (ML), LLM, RAG (Retrieval-Augmented Generation), OCR, AI Agents, Automatisation Intelligente"),
        ("Outils & Environnements", "Git & GitHub (CI/CD), Docker, Visual Studio Code, n8n (Orchestration workflows), Playwright (Testing/Scraping), Vercel, Odoo (ERP), WordPress"),
        ("Systemes & Reseaux", "Linux (Serveurs & Shell Bash), Windows Server, Administration Reseau (DHCP, DNS, routage), Securite Informatique, Filtrage Web, Supervision & Monitoring")
    ]
    
    for title, items in skill_blocks:
        # Category title box
        stream2.append("0.96 0.98 1 rg")
        stream2.append(f"40 {y - 36} 515 42 re f")
        stream2.append("0.85 0.9 0.96 rg")
        stream2.append(f"40 {y - 36} 515 42 re s")
        
        stream2.append("BT")
        stream2.append("/F2 9.5 Tf")
        stream2.append("0.08 0.28 0.65 rg")
        stream2.append(f"50 {y - 12} Td")
        stream2.append(f"({escape_pdf(title.upper())}) Tj")
        stream2.append("ET")
        
        stream2.append("BT")
        stream2.append("/F1 8.5 Tf")
        stream2.append("0.2 0.25 0.3 rg")
        stream2.append(f"50 {y - 27} Td")
        stream2.append(f"({escape_pdf(items)}) Tj")
        stream2.append("ET")
        y -= 50

    y -= 10
    y = draw_section_title(stream2, "Qualites Humaines & Pratiques d'Ingenierie", y)
    
    qualities = [
        ("Autonomie", "Capacite eprouvee a concevoir et mener a bien des applications complexes de bout en bout."),
        ("Polyvalence", "Maitrise de la pile complete : interface reactives, services backend, base relationnelle et serveurs."),
        ("Esprit d'Analyse", "Methodologie rigoureuse de modelisation des flux d'information et des processus metiers."),
        ("Capacite d'Adaptation", "Integration rapide dans des contextes varies (CERES, FID Ambositra, CHU Fianarantsoa)."),
        ("Resolution de Problemes", "Pragmatisme, recherche continue d'optimisation des performances et prevention des pannes."),
        ("Apprentissage Continu", "Veille constante sur l'IA generative, les architectures d'agents et le developpement moderne.")
    ]
    
    for title, desc in qualities:
        stream2.append("BT")
        stream2.append("/F2 9 Tf")
        stream2.append("0.1 0.2 0.35 rg")
        stream2.append(f"40 {y} Td")
        stream2.append(f"({escape_pdf('- ' + title + ' : ')}) Tj")
        stream2.append("/F1 8.5 Tf")
        stream2.append("0.25 0.3 0.35 rg")
        stream2.append(f"({escape_pdf(desc)}) Tj")
        stream2.append("ET")
        y -= 18

    y -= 10
    y = draw_section_title(stream2, "Certifications & Formations Specialisees (Section Evolutive)", y)
    
    cert_info = [
        "- Intelligence Artificielle & Data Science : En cours d'accreditations officielles (ML, LLM, RAG).",
        "- Developpement Logiciel : Pratiques avancees Full Stack (React/TypeScript, Python REST, PWA).",
        "- Cybersecurite, Reseaux & Cloud : Politiques de securite des SI, conteneurisation Docker et monitoring."
    ]
    for c in cert_info:
        stream2.append("BT")
        stream2.append("/F1 8.5 Tf")
        stream2.append("0.3 0.35 0.4 rg")
        stream2.append(f"40 {y} Td")
        stream2.append(f"({escape_pdf(c)}) Tj")
        stream2.append("ET")
        y -= 16

    # Footer note page 2
    stream2.append("BT")
    stream2.append("/F1 8 Tf")
    stream2.append("0.5 0.55 0.6 rg")
    stream2.append("40 25 Td")
    stream2.append(f"({escape_pdf('Narindra Rackoto - Ingenieur en informatique | Master ENI 2026  --  Page 2 / 2')}) Tj")
    stream2.append("ET")
    
    pdf.add_content(p2, "\n".join(stream2))
    
    # Save output
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "CV_Narindra_Rackoto.pdf")
    pdf.write_pdf(output_path)
    print(f"CV PDF genere avec succes : {output_path} (taille : {os.path.getsize(output_path)} octets)")

if __name__ == '__main__':
    build_narindra_cv()
