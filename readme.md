# Shelter

![Banner][banner]

## The story of..
This code is an example of a simple Express server. For an [assignment](https://github.com/cmda-be/course-17-18/tree/master/examples/express-server) I had to fix the example step by step. By doing this I would get familiar with Express.js. The code portraits a shelter websites where you can adopt pets. 

## The steps I took

### Serving images
I had to make a route from the images in the `db/image` and give it back as `/image`. So I dived in the docs from Express and found the right example to make that route. I defined the route for the images and used the `static()` function to tell the server where to get it from.

*What I did*
```javascript
.use('/image', express.static('db/image'))
```

### Support the detail view
To make a detail page I had to get all the data from one animal and render it in a detail page. But I didn't knew how on the go. So started to look at the first `GET` request callback and found a way to do it. But I wasn't there yet. To get all the data from the given ID I had to catch it from the given url. I found an example from an [article](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters) from Chris Seveilleja. He stored the ID that has been given in the url in a var and used it in the `send()` funtion.

This is how I structed it:

```javascript
function get(req, res, next) {

  // Store the id from the requested url and puts it a var
  var id = req.param('id')

  // Get data by ID from the database
  var result = {errors: [], data: db.get(id)} 

  //Render the resulting data in detail.ejs
  res.render('detail.ejs', Object.assign({}, result, helpers))

}
```

## Actually not done yet...
There are still some things I should fix before I complemented the assignment. But I wil do this some other time. 


## Recourses
* [Static file serve express](https://expressjs.com/en/starter/static-files.html)
* [Get url and post parameters](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters)

## License

[MIT][mit] © Valentijn Kap

[mit]: license
[banner]: preview.png
