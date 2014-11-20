CSC308 - A3
------------------------------
c3huangk - Maxwell Huang-Hobbs
g3gohnic - Nicholas Goh
------------------------------
AMI ID: 
ami-424ede2a

Source Files:
If for some reason the wrong assignment is being 
shown on the server, run:

`/home/ubuntu/309-assignments/estore/estore/setupwww`

which should copy the relevant files to the apache www/html folder.

Starting Apache: 
The apache server should be running by default. If not, run:
								`sudo apachectl start`


Target Browser: Google Chrome

Documentation:

Our website is implemented using the model-view-controller (MVC) design pattern, and consequently,
all of our work has been done as either a model, view or control. Upon accessing our website, the
index page of our store view that lists products currently for sale, and a login option that is 
organized similarly to how you would expect a regular online store front to operate.

Sessions are managed with various session variables and user checks to ensure that customers are 
presented with appropriate pages while admins are presented with appropriate panels. Creation and 
deletion of products, orders and users are treated similarly in that they all rely on appropriate 
removal and insertion commands affecting the database. Shopping carts are managed in the controller 
file me.php which handles user settings and session settings such as orders and shopping cart states. 
Adding and removing from the cart is managed by adding and removing valid items (searched by id) from
a key in the userdata "cart" which stores all of the current items in the cart.

Email reciepts are handled by gmail SMTP servers and using the email library. Aside from managing email
source which is dealt with in a config array for SMTP server settings, the reciept sending process
is quite simple and just involves sending an email from our specified email to the current user's
email address which has already been stored in the customers database. All SMTP server settings can
be viewed and managed in me.php as well.

User registration and other higher level functions we created, are all dealt with in similar ways. 
Registration for example, uses a view to receive inputs and checks it against the built-in form 
validation library from CodeIgniter, ensuring that passwords/users/etc. are all unique and meet
the required constraints.  