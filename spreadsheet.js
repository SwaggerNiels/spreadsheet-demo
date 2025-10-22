import {
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

//bump update
// Exported setup function
export function setupSpreadsheet(db) {
  const container = document.getElementById('sheet');
  const statusEl = document.getElementById('status');

  // Example starting data
  const data = [
    [
      'First Author',
      'Year',
      'Link',
      'Pizza point',
      'Done',
      '',
      'Review',
      'Modelable',
      'Model base',
      'Spatial (1D vs 2D) complexity',
      'Temporal complexity (S: Steady State, T: Transient)',
      'Form (closed-form, ODE, PDE, numerical)'
    ],
    [
      'Robinson',
      '2006',
      'https://doi.org/10.1149/1.2172534.',
      'Niels',
      'Y',
      '',
      'N',
      'Y',
      'Electrochemistry',
      '1D',
      'S',
      'closed-form'
    ],
    [
      'Bernards',
      '2007',
      'https://doi.org/10.1002/adfm.200601239.',
      'Niels',
      'Y',
      '',
      'N',
      'Y',
      'Transistor device physics',
      '1D',
      'S, T',
      'closed-form'
    ]
  ];

  // Custom renderer for clickable links
  function linkRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    
    if (value && typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://') || value.includes('doi.org'))) {
      td.innerHTML = `<a href="${value}" target="_blank" style="color: #0066cc; text-decoration: underline;">${value}</a>`;
    }
    
    return td;
  }

  // Handsontable instance
  const hot = new Handsontable(container, {
    data,
    rowHeaders: true,
    colHeaders: data[0], // use first row of data as column headers
    columns: data[0].map((header, index) => {
      // Make the "Link" column (index 2) clickable
      if (index === 2) {
        return { renderer: linkRenderer };
      }
      return {};
    }),
    manualColumnResize: true,
    stretchH: 'none',
    dropdownMenu: true,
    contextMenu: true,
    filters: true,
    licenseKey: 'non-commercial-and-evaluation'
  });

  // Firebase reference
  const dataRef = ref(db, 'sheetData');

  // 🟢 Load from Firebase
  onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      hot.loadData(snapshot.val());
      setStatus('Synced');
    } else {
      setStatus('New sheet created');
    }
  });

  // 🟡 Save edits to Firebase
  let saveTimeout;
  hot.addHook('afterChange', (changes, source) => {
    if (source === 'loadData' || !changes) return;
    setStatus('Saving...');
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      set(dataRef, hot.getData())
        .then(() => setStatus('Synced'))
        .catch(() => setStatus('Error saving'));
    }, 1000);
  });

  // 💬 Helper for status messages
  function setStatus(text) {
    statusEl.textContent = text;
    if (text === 'Synced') statusEl.style.background = '#2ecc71';
    else if (text === 'Saving...') statusEl.style.background = '#f1c40f';
    else if (text === 'Error saving') statusEl.style.background = '#e74c3c';
    else statusEl.style.background = '#555';
  }
}
