var app = require('./express.js');
var User = require('./user.js');
var Item = require('./item.js');
var Hoa = require('./hoa.js');
// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//
Hoa.create({
	name: 'Apple Valley',
	message: 'On behalf of the Apple Valley Homeowners Association Board of Directors and the other homeowners of Apple Valley at Pointe Vista, we would like to welcome you to your new home and our community. Over the coming months we look forward to meeting you whether it be walking down the streets, at the pool or a community activity.  The operation of your homeowners association is governed by a board of volunteer directors. The Board of Directors is elected by the community to oversee the daily functions and financial responsibilities of the Association. The Board is also responsible for maintaining members’ compliance with the established covenants and bylaws of the Association. They have specific provisions regarding what can and cannot be done on your property. Please take the time to read through the Bylaws and Covenants documents you received during the home purchase process. Copies are available on the community web site. ',
	announcements: [{
		title: 'Pool Closing',
		description: 'The pool will be closing for the winter'
	}, {
	 	title: 'Fall Party',
		description: 'You are invited to attend the annual HOA Fall get together!'
	}]
});
// register a user
app.post('/api/users/register', function (req, res) {
	console.log('git');
  // find or create the user with the given email
  User.findOrCreate({email: req.body.email}, function(err, user, created) {
	  console.log('err', err);
	  console.log('created', created);
    if (created) {
      // if this email is not taken, then create a user record
      user.name = req.body.name;
      user.hoa = req.body.hoa;
      user.set_password(req.body.password);
      user.save(function(err) {
	if (err) {
	  res.sendStatus("403");
	  return;
	}
        // create a token
	var token = User.generateToken(user.email);
        // return value is JSON containing the user's name and token
        res.json({name: user.name, token: token});
      });
    } else {
      // return an error if the email is taken
      res.sendStatus("403");
    }
  });
});

// login a user
app.post('/api/users/login', function (req, res) {
  // find the user with the given email
  User.findOne({email: req.body.email}, function(err,user) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    // validate the user exists and the password is correct
    if (user && user.checkPassword(req.body.password)) {
      // create a token
      var token = User.generateToken(user.email);
      // return value is JSON containing user's name and token
      res.json({name: user.name, token: token});
    } else {
      res.sendStatus(403);
    }
  });
});





// get all hoas for the user
app.get('/api/hoas', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, find all the user's hoas and return them
      Hoa.find(function(err, hoas) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	// return value is the list of hoas as JSON
	res.json({hoa: hoas});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// add an hoa
app.post('/api/hoas', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, create the hoa for the user
      Hoa.create({title:req.body.hoa.title,completed:false,user:user.id}, function(err,hoa) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	res.json({hoa:hoa});
      });
    } else {
      res.sendStatus(403);
    }
  });
});




// get all items for the user
app.get('/api/items', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, find all the user's items and return them
      Item.find({user:user.id}, function(err, items) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	// return value is the list of items as JSON
	res.json({items: items});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// get all items for the user
app.get('/api/hoas', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, find all the user's items and return them
      Hoa.find({}, function(err, items) {
	if (err) {
		consle.log('err', err);
	  res.sendStatus(403);
	  return;
	}
	// return value is the list of items as JSON
	console.log('times', items);
	res.json({hoas: items});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// add an item
app.post('/api/items', function (req,res) {
  // validate the supplied token
  // get indexes
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, create the item for the user
      Item.create({title:req.body.item.title,completed:false,user:user.id}, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
	res.json({item:item});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// get an item
app.get('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findById(req.params.item_id, function(err, item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        // get the item if it belongs to the user, otherwise return an error
        if (item.user != user) {
          res.sendStatus(403);
	  return;
        }
        // return value is the item as JSON
        res.json({item:item});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// update an item
app.put('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findById(req.params.item_id, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        // update the item if it belongs to the user, otherwise return an error
        if (item.user != user.id) {
          res.sendStatus(403);
	  return;
        }
        item.title = req.body.item.title;
        item.completed = req.body.item.completed;
        item.save(function(err) {
	  if (err) {
	    res.sendStatus(403);
	    return;
	  }
          // return value is the item as JSON
          res.json({item:item});
        });
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// delete an item
app.delete('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findByIdAndRemove(req.params.item_id, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
});

