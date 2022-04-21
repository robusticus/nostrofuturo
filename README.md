This is the front end of a personal project of mine I've been building off and on for a few years.

It started as just a process that took CSV (Comma Separated Values, i.e. spreadsheets), did a whole bunch of analysis, set math and output CSV results.

I was actually pretty stunned at the results, after tweaking and tweaking for what seemed like forever. I always knew it would be profitable, but I had no idea just how efficient this could be.

So after getting the algorithm working as well as possible, I decided it was worthwhile to formalize it a bit and put some effort into polishing it up. Plus, I love working with React for front end work so it has become a portfolio project for me. Since I wrote and own everything about this, I can freely share the code via github.

Besides, looking at CSV all the time in Notepad is hard on the eyes.

This frontend is built on top of the same CSV, converted to JSON. It was built with React, Material UI and a graphics tool called Victory Chart. It is hosted as a static web site on Azure, consuming blob output from a scheduled function that syncs up the source data, runs the calculations and alerts when actions (trades) are taken. It is set up with a continuous deployment pipeline that runs from local git pushes.

What do you think?

Should be running @ https://www.prescientai.com