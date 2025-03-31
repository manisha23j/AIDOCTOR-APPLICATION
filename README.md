This is AI Doctor Application, 
It has two folders one is for front-end [ client ] and another one is back-end [ server ]
You need to install Node and MongoDB in your machine.
1. Download the Node.js Installer:
Go to the official Node.js website: nodejs.org. 
Download the installer package. The LTS (Long Term Support) version is generally recommended for most users. 
2. Run the Installer:
Double-click the downloaded installer file (.msi for Windows, .pkg for macOS).
Follow the on-screen instructions. Accept the default settings or customize as needed. 
3. Verify Installation:
Open a command prompt (Windows) or terminal (macOS/Linux).
Type node -v and press Enter.
If Node.js is installed correctly, the command prompt will display the installed Node.js version. 
4. Node Package Manager (NPM):
Node.js comes bundled with NPM (Node Package Manager), which is a command-line utility for managing packages and dependencies. 
You can verify NPM installation by typing npm -v in the command prompt/terminal. 
If NPM is installed correctly, the command prompt will display the installed NPM version.
MongoDB:
Go to MongoDB community Edition, download latest msi file for windows and follow the installation process by clicking next ->  next.
After that open and add a connection and save the connection. Before that copy the connection URL. In future we place it in dbConfig.js file in server folder.
then you need to download this code as zip or clone into your local machine. 
Next 
Open code base with VS Code, 
Then redirect to Client folder in terminal and run command npm install. This will install all dependencies.
Then redirect to server folder in terminal run command npm install here also. This will install all dependencies.
Now take that previous mongoDB connection place it in dbConfig.js file.
Now try to open through local port the application and register as user.
You can view the application.
__________________________________Thank You___________________________________________
