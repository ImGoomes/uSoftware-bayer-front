import React, {useEffect,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../css/candidate-resume.css'
import jQuery from 'jquery'
import axios from "axios";
import getLocalStorage from "../uJob-local-storage";


const uploadPdf = async function (props) {
    try {
        const pdfOcr = await axios.post('http://usoftwareapi.azurewebsites.net/api/ocr/PdfToText',
            { FileName: props.FileName, Base64: props.Base64 })

        const userLocalstg = getLocalStorage();

        //Chamada para o back-end. TEM UMAS GABIARRAZINHA DA CORRERIA, DAVA PARA SER MELHOR
        await axios.post(`${process.env.REACT_APP_API_ADDRESS}/curriculum`, {
            fileName: pdfOcr.data.fileName,
            fileContent: pdfOcr.data.text,
            base64: pdfOcr.data.base64,
            user_id: userLocalstg.user_id
        }, {
            headers: { token: userLocalstg.token }
        })

        jQuery.alert({
            title: 'Sucesso!',
            content: 'Curriculo carregado com sucesso.',
        });

    } catch (error) {
        jQuery.alert({
            title: 'Ops, algo deu errado!',
            content: error.message,
        });
    }
}

export default function CandidateResume(props){
    const display = {}

    if(!props.display)
        Object.assign(display, {display: 'none'})


    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'application/pdf',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        onDropRejected(files, event) {
            jQuery.alert({
                title: 'Ops, algo deu errado!',
                content: 'Arquivo não permitido, tente arquivos com final .pdf!',
            });
        },
        onDropAccepted(files, event) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                const base64 = reader.result.replace(/^data:.+;base64,/, '')
                uploadPdf({
                    FileName: files[0].name,
                    Base64: base64
                })
            }
            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
        }
    })

    const thumbs = files.map(file => (
        <div className='thumb' key={file.name}>
            <div className='thumbInner'>
                <img
                    src={require('../assets/img/pdf.png')}
                    className='img'
                    title={file.name}
                    alt={file.name}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div style={display}>
            <section className='container-candidate-resume'>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Arraste o arquivo ou clique para seleciona-lo</p>
                </div>
                <aside className='thumbsContainer'>
                    {thumbs}
                </aside>
            </section>
        </div>
    )
}
