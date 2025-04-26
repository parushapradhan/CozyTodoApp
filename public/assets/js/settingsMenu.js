document.addEventListener('DOMContentLoaded', () => {
    // Assume USER is globally available
    const dozyCheckbox = document.getElementById('toggle-dozy');
    const henCheckbox = document.getElementById('toggle-henrietta');
    const toggleFormatBtn = document.getElementById('toggle-format');
    // Unlock checkboxes based on level
    if (USER.level >= 1) dozyCheckbox.disabled = false;
    if (USER.level >= 2) henCheckbox.disabled = false;
  
    // Initialize checkboxes based on user data
    dozyCheckbox.checked = USER.animal=== 'dozy' || false;
    henCheckbox.checked = USER.animal==='henrietta' || false;
  
    // Toggle time format
    toggleFormatBtn.addEventListener('click', () => {
      USER.timeFormat = USER.timeFormat === '12hr' ? '24hr' : '12hr';
      console.log('Time format set to:', USER.settings.time_format);
    });
  

    document.getElementById('save-settings').addEventListener('click', () => {
      const updatedFields = {};
      if (dozyCheckbox.checked && USER.animal !== 'dozy') {
        updatedFields.animal = 'dozy';
      } else if (henCheckbox.checked && USER.animal !== 'henrietta') {
        updatedFields.animal = 'henrietta';
      }
    
      // Example: change time format
      const currentFormat = USER.settings.time_format;
      const newFormat =
        USER.settings.time_format === '12hr' ? '24hr' : '12hr';
      if (currentFormat !== USER.settings.time_format) {
        updatedFields['settings.time_format'] = USER.settings.time_format;
      }
    
      if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        return;
      }
    
      fetch('/updateUserSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      })
      .then(res => res.json())
      .then(data => {
        alert('Settings updated!');
        window.location.reload(); // Refresh to reflect changes
      })
      .catch(err => {
        console.error('Update failed', err);
      });
    });
    
  });
  