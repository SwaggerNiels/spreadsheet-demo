# 📊 OECT-Model Overview Spreadsheet

A collaborative web-based spreadsheet for tracking and cataloging Organic Electrochemical Transistor (OECT) models and research papers.

## 🎯 Purpose

This interactive spreadsheet serves as a centralized repository for OECT research, allowing researchers to:

- **Categorize models** by complexity, approach, and mathematical form
- **Collaborate in real-time** with automatic synchronization
- **Filter and search** through the growing database of OECT models
- **Assess modelability** of different research approaches
TODO: 
- **Track research papers** with comprehensive metadata

## 🚀 Getting Started

### Using the Website

**We strongly recommend using this web interface to add new OECT models to our collaborative database.**

1. **Open the website** by loading (the website)[https://swaggerniels.github.io/spreadsheet-demo/]
2. **Browse existing entries** to understand the data structure
3. **Add new models** by:
   - Right-clicking to access the context menu
   - Inserting new rows for additional papers
   - Filling in all relevant columns with paper details
4. **Your changes are automatically saved** to the cloud database
5. **See real-time updates** from other collaborators

### Column Descriptions

| Column | Description |
|--------|-------------|
| **First Author** | Primary author's last name |
| **Year** | Publication year |
| **Link** | Full citation with DOI link |
| **Pizza point** | Assigned reviewer/researcher |
| **Done** | Review completion status (Y/N) |
| **Review** | Review status (Y/N) |
| **Modelable** | Can this work be modeled? (Y/N) |
| **Model base** | Underlying modeling approach |
| **Spatial complexity** | 1D vs 2D spatial modeling |
| **Temporal complexity** | S: Steady State, T: Transient |
| **Form** | Mathematical form (closed-form, ODE, PDE, numerical) |
etc.

## ✨ Features

- **Real-time collaboration** - Multiple users can edit simultaneously
- **Automatic cloud sync** - All changes are saved to Firebase
- **Advanced filtering** - Sort and filter by any column
- **Responsive design** - Works on desktop and mobile devices
- **Export capabilities** - Data can be exported for analysis
- **Version control** - Firebase maintains change history

## 🔧 Technical Details

Built with:
- **Handsontable** - Professional spreadsheet component
- **Firebase Realtime Database** - Cloud synchronization
- **Vanilla JavaScript** - Lightweight and fast
- **Modern ES modules** - Clean, maintainable code

## 📝 Contributing

### Adding New OECT Models

**Please use the web interface to add new entries rather than editing files directly.**

When adding a new OECT model:

1. **Research thoroughly** - Ensure the paper isn't already in the database
2. **Fill all relevant columns** - Complete information helps everyone
3. **Use consistent formatting** - Follow existing patterns for years, citations, etc.
4. **Mark review status** - Help track what's been processed
5. **Assess modelability** - This is key for our research goals

### Guidelines

- Use **full citations** with DOI links when available
- Keep **author names** consistent (use last name, first name format)
- Mark **temporal complexity** as "S" (Steady State), "T" (Transient), or "S, T" (both)
- Be specific about **model base** (e.g., "Electrochemistry", "Transistor device physics")

## 🎓 Research Context

This database supports ongoing research into OECT modeling approaches, helping identify:
- Gaps in current modeling capabilities
- Trends in modeling complexity over time
- Opportunities for new modeling frameworks
- Relationships between device physics and mathematical approaches

## 🤝 Collaboration

This is a shared resource for the OECT research community. By contributing to this database, you're helping build a comprehensive view of the field that benefits all researchers working on organic electrochemical transistors.

**Ready to contribute? Open (the website)[https://swaggerniels.github.io/spreadsheet-demo/] in your browser and start adding OECT models!**

---

*For technical issues or questions about the database, please reach out to the maintainers.*
