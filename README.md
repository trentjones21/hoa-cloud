
# Example

http://104.131.184.169:3000

# To Run

	clone the repository
	npm install
	webpack
	node server.js
	

# Description

For my project I create a website that will help Home Owners Associations 
keep track of important files and dad.  My dad is an attorney who does legal work for HOAs, and through him I have seen many HOAs that struggle to stay organized. 

In its current state, my application allows a user to registser for an account and connect their account to the HOA where they live.  They can log in, view announcements, and view important files.  

# Database

Currently, my database has 2 collections where data needs to be stored.  A user collection, and an hoa collection.  The user collection is used to store the user data when they log in, and the hoa collection is used to store hoa data, such as announcements, and the welcome message.

I have not worked with mongo very much, but I can already tell that as this project grows I am going to have to restructure my database so it is scalable.  For example, I would like to create an announcements collection in order to store the hoa announcements seperately from the actual hoa collection.

# Future Features

There are a lot of other features that I think could make the lives of HOAs easier.  One big one is bill pay.  It would be cool if each member of an HOA could get online and pay their HOA dues.  Or better yet, set up a repeating event that automatically pays their dues each month.  

Another feature I would like to add is the ability to vote online.  Most HOAs have yearly or quartely voting.  Many of the HOA memebers are not able to vote because they cannot attend the meetings.  Creating a voting system would solve that problem and allow more people's voices to be heard.

This is my first project using React.  Because of that, I would like to change some of the code structure now that I have a basic understanding of how React works.  I will probably do that sooner than later, as it will be harder the bigger this project grows.

