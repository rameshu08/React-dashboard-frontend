import { Dialog, DialogContent, TextField } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'

function EditUser({editUser, onClose, getUsers}) {

    const handleSubmit = async(values) => {
        try {
            let payload = values
              
              let response = await axios.put(`http://localhost:8000/users/${editUser.id}`, payload);
              if(response.data){
                getUsers()
                onClose()
              }
        } catch (error) {
            console.log(error.response)
        }
    }
  return (
    <div>
        <Dialog open={!!editUser}>
            <div>
                <div className='pl-6 pt-2 text-2xl font-semibold'>
                    Edit User
                </div>
                <DialogContent>
                    <div className='w-80'>
                        <Formik
                            initialValues={{
                                name: editUser ? editUser.name : "",
                                email: editUser ? editUser.email : "",
                                mobile: editUser ? editUser.mobile : ""
                            }}
                            onSubmit={(values) => {
                                handleSubmit(values)
                            }}
                        >
                            {({values, setFieldValue}) => 
                                <Form>
                                     <div className='flex flex-col my-2'>
                                        <span>Name</span>
                                        <Field
                                            name="name"
                                            component={TextField}
                                            value={values.name}
                                            onChange={(e) => setFieldValue('name', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col my-2'>
                                        <span>Email</span>
                                        <Field
                                            name="email"
                                            component={TextField}
                                            value={values.email}
                                            onChange={(e) => setFieldValue('email', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col my-2'>
                                        <span>Mobile</span>
                                        <Field
                                            name="mobile"
                                            component={TextField}
                                            value={values.mobile}
                                            onChange={(e) => setFieldValue('mobile', e.target.value)}
                                        />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button className='py-1 px-3 mr-2' onClick={onClose}>
                                            Cancel
                                        </button>
                                        <button type='submit' className='px-3 py-0.5 bg-blue-800 text-white rounded'>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            }
                        </Formik>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    </div>
  )
}

export default EditUser