document.addEventListener('DOMContentLoaded', function() {
    // Get today's date and extract the day (1 - 31)
    const today = new Date();
    const day = today.getDate();
    // Convert the day number into a string to process each digit individually
    const dayNames =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[today.getDay()];
    const dayStr = day.toString();
    console.log(dayStr);
    let digitsHTML = '';
    // Loop through each digit and create an image element for it
    for (const digit of dayStr) {
      // Adjust the image path as needed. For example, "img/1.png" for the digit 1.
      digitsHTML += `<img src="/assets/images/calendar/numbers/numbers_${digit}.png" alt="${digit}" style='margin-top:40px'>`;
    }
    
    // Build the HTML for the image of the day.
    // Update the src attribute as needed if the file name or location differs.
    const imageOfTheDayHTML = `<img src="/assets/images/calendar/day/${dayName.toLowerCase()}.png" alt="Image of the Day">`;
    
    // Combine both parts together with a line break between them.
    document.getElementById('calendar').innerHTML = digitsHTML + '<br>' + imageOfTheDayHTML;
  });