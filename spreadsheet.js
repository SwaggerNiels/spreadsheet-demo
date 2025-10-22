import Handsontable from "https://cdn.jsdelivr.net/npm/handsontable@14.3.0/dist/handsontable.esm.js";
import {
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

import {
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Exported setup function
export function setupSpreadsheet(db) {
  const container = document.getElementById('sheet');
  const statusEl = document.getElementById('status');

  // Example starting data
  const data = [
    ['Device', 'Model Type', 'Thickness (nm)', 'Mobility (cm²/Vs)', 'Notes'],
    ['Sample A', 'P-type', 100, 1.23, 'Stable response'],
    ['Sample B', 'N-type', 80, 0.89, 'Degradation observed'],
    ['Sample C', 'P-type', 120, 1.05, 'Excellent reproducibility']
  ];

  // Handsontable instance
  const hot = new Handsontable(container, {
    data,
    rowHeaders: true,
    colHeaders: ['Device', 'Model Type', 'Thickness (nm)', 'Mobility (cm²/Vs)', 'Notes'],
    columns: [
      { data: 0, width: 150 },
      { data: 1, width: 120 },
      { data: 2, type: 'numeric', width: 130 },
      { data: 3, type: 'numeric', width: 160 },
      { data: 4, width: 300 }
    ],
    manualColumnResize: true, // allows user to resize columns
    stretchH: 'none', // keep your manual widths
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
