'use strict'

var express = require('express')
var db = require('../db')
var helpers = require('./helpers')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
  .use('/image', express.static('db/image'))
  .get('/', all)
   .get('/form', form)
  // .post('/', add)
  .get('/:id', get)
  // .put('/:id', set)
  // .patch('/:id', change)
  .delete('/:id', remove)
  .listen(1902)

function all(req, res) {
  var result = {errors: [], data: db.all()}

  res.format({
    json: () => res.json(result),
    html: () => res.render('list.ejs', Object.assign({}, result, helpers))
  })
}

function get(req, res) {
  var id = req.param('id')
  var has

  var result = {
    errors: [], 
    data: undefined
  }

  try {
    has = db.has(id)
  } catch (err) {
    result.errors.push({id : 400, title : 'bad request', description : 'bad request'})
    res.status(400).render('error.ejs', Object.assign({}, result, helpers))
    return
  }

  if (has) {
    result = {error: [], data: db.get(id)}

    res.format({
      json: () => res.json(result),
      html: () => res.render('detail.ejs', Object.assign({}, result, helpers))
    }) 
  } else if (db.removed(id)) { 
    result.errors.push({id : 410, title : 'Gone', description : 'Its gone!'})
    res.status(410).render('error.ejs', Object.assign({}, result, helpers))
  } else {
    result.errors.push({id : 404, title : 'Not Found', description : 'Sorry we can not help you!'})
    res.status(404).render('error.ejs', Object.assign({}, result, helpers))
  }

}

function remove(req, res) {
  var id = req.param('id')
  var data = db.get(id)
  var has

  // Gives internal server error (500) instead of 400
  try {
    has = db.has(id)
  } catch (err) {
    res.status(400).json(id)
    return
  }

  if (data) {
    db.remove(id)
    res.status(204).json(data)
  } else if (db.removed(id)) {
    res.status(410).json('Is already removed')
  } else {
    res.status(404).json(id)
  }

}

function form(req, res) {
  res.render('form.ejs')
}


