import React, {useEffect,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../css/candidate-resume.css'

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
            alert('Arquivo não permitido, tente arquivos com final .pdf')
        },
        onDropAccepted(files, event) {
            debugger;
            // const toBase64 = file => new Promise((resolve, reject) => {
            //     let reader = new FileReader();
            //     reader.readAsDataURL(files[0]);
            //     reader.onload = function () {
            //         console.log(reader.result);
            //     };
            //     reader.onerror = function (error) {
            //         console.log('Error: ', error);
            //     };
            // });
        }
    });

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
            <section className='container'>
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
