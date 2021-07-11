/*
Since Create React App doesn’t let you override the PostCSS configuration natively, 
we also need to install CRACO to be able to configure Tailwind
*/

// Create React App Configuration Override (CRACO) is an easy and comprehensible configuration layer for create-react-app.

// Get all the benefits of create-react-app and customization without using 'eject' by adding a single craco.config.js file at the root of your application and customize your eslint, babel, postcss configurations and many more.

// All you have to do is create your app using create-react-app and customize the configuration with a craco.config.js file.


module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ]
        }
    }
}