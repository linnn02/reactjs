import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'

const schema= Yup.object({
  title: Yup.string().min(2, 'too short').required('Required'),
  author: Yup.string().required('Required'),
  genre: Yup.string().oneOf(['fiction', 'nonfiction', 'tech']).required('Required'),
  rating: Yup.number().min(0).max(5).required('Required'),
})

function AddBook() {
  const navigate = useNavigate()

  return (
  <div>
    <h1>Add Book</h1>
    <Formik 
    initialValues = {{ title: '', author: "", genre: '', rating: ''}}
    validationSchema = {schema} 
    onSubmit ={(values)=>{
      const saved = JSON.parse(localStorage.getItem('books')) || []
      const newBook = {id: Date.now(), ...values}
      localStorage.setItem('books', JSON.stringify([...saved, newBook]))
    }}>
      <Form>
        <label>Title</label>
        <Field name='title' />
        <ErrorMessage name='title' component='div' />

        <label>Author</label>
        <Field name='author' />
        <ErrorMessage name='author' component='div' />

        <label>Genre</label>
        <Field as='select' name='genre' />
        <option value=''>Select.....</option>
        <option value='fiction'>Fictiion</option>
        <option value='nonfiction'>Nonfiction</option>
        <option value='tech'>Tech</option>
        <ErrorMessage name='genre' component='div' />

        <label>Rating</label>
        <Field type='number' step='0.1' name='rating' />
        <ErrorMessage name='rating' component='div' />

        <button type='submit'>Add Book</button>
      </Form>
    </Formik>
  </div>
  )
}

export default AddBook
