
Consist of : #Modules, partials, and vendor
As you can see this divides into three basic types of files. 
Modules, partials, and vendored stylesheets.

1. The modules directory is reserved for Sass code that doesn't 
cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.

2. The partials directory is where the meat of my CSS is constructed. A lot of 
folks like to break their stylesheets into header, content, sidebar, and footer components (and a few others).
I like to break things down into much finer categories (typography, buttons, textboxes, selectboxes, etc…).

3. The vendor directory is for third-party CSS. This is handy when using prepackaged 
components developed by other people (or for your own components that are maintained in another project). 
jQuery UI and a color picker are examples of CSS that you might want to place in the vendor directory. 
As a general rule I make it a point not to modify files in my vendor directory. 


