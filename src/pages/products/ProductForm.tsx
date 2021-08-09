import { Button, TextField } from '@material-ui/core'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../../components/Layout'
import api from '../../services/api'


export default function ProductForm(props: any) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        //recuperando dados no banco de um id específico
        if(props.match.params.id){ //se tem id, seta os valores dos states com os valores que vem do db
        (
            async () => {
                const { data } = await api.get(`api/admin/products/${props.match.params.id}`)

                //setando os estados com os valores que vieram do banco
                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setPrice(data.price)
            }
        )()
    }
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        //objeto com os campos que serão enviados
        const data = {
            title,
            description,
            image,
            price,
        }

        //se tem id, edita 
        props.match.params.id ? 
        await api.put(`api/admin/products/${props.match.params.id}`, data) 
        : 
        //se não tem id, cria
        await api.post('api/admin/products/', data);

        setRedirect(true)
    }

    //se redirect for true, redireciona para a page products
    if (redirect) {
        return <Redirect to={'/products'} />
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <TextField
                        label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Description"
                        rows={4} multiline
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Image"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">SUBMIT</Button>
            </form>
        </Layout>
    )
}
