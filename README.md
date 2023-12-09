#About NEWS API

Access the latest global news via the NewsApi, which aggregates news from around the world. To learn more about it, visit NewsApi Documentation. The system displays news across various categories from different parts of the globe.

#Installation Steps

1.Ensure you have Node.js installed on your system. If not, download it from Node.js Official Website https://nodejs.org/en.
2.Create a folder and name it according to your preference.
3.Use GitBash or any preferred command line interface. Navigate to the folder you just created.
4.Install Express in the root directory using npm. You can do this by running: npm install express https://www.npmjs.com/package/express.
5.Install EJS by running: npm install ejs https://www.npmjs.com/package/ejs.
6.Node-fetch usually comes with Node.js when installed on your system; no additional installation is necessary.
7.Install Body-parser using npm: npm install body-parser https://www.npmjs.com/package/body-parser.
8.Utilize a .env file to store your API key securely. You can install and use the 'dotenv' package for this purpose. Run: npm install dotenv https://www.npmjs.com/package/dotenv.

#Setup Process

1.Create a 'views' folder in the root directory to store your views/templates.
2.Establish a 'public' folder to store your images and Bootstrap files for the frontend.
3.Inside the 'views' directory, create a folder named 'partials' for reusable components if needed.
4.Create a .env file in your root directory to store sensitive information like API keys.
5.Set up an 'app.js' file to handle your routes and server logic.
6.Import all the necessary packages into your 'app.js' file.
Once your setup is complete, navigate to the root directory in your command line interface and run the application by executing: node app.js.
