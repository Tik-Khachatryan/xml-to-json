import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';


function App() {
    const [file, setFile] = useState({
        selectedFile: null
    });

    const [data, setData]      = useState([]);
    const [inp, setInp]        = useState({
        search: ''
    });
    const [filter, setFilter]  = useState([])
    const selectHandleOnChange = (event) => {
        setFile({
            selectedFile: event.target.files[0]
        });
    };


    const upload = () => {
        const fd = new FormData();
        fd.append('xml', file.selectedFile);
        axios.post('http://localhost:3001/upload',
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res => {
                setData(res.data[0]["Sheet 1"])
                // console.log(res.data[0]["Sheet 1"])
            })
            .catch(err => console.log(err))

    };

    const handleOnChange = (event) => {
        setInp({
            ...inp,
            [event.target.name]: event.target.value
        });

    };

    useEffect(() => {
        if (data !== undefined) {
            const result = data.filter(member => member.A.includes(inp.search));
            setFilter(result)
        }

    }, [inp.search]);

    return (
        <div className="App">
            <div className={'btn'}>
                <input id={'file'} type="file" name={'xml'} accept="xml/xlsx" onChange={selectHandleOnChange}/>
                <br/>
                <button id={'saveBtn'} onClick={upload}>Save</button>
                <br/>
                <input id={'search'} name={'search'} type="text" placeholder={"Search members . . ."}
                       onChange={handleOnChange}/>
            </div>
            {
                inp.search !== '' ? filter.map((item, index) => {
                    return (
                        <div key={index}>
                            <ul>
                                <li>{item.A}</li>
                                <li>{item.B}</li>
                                <li>{item.C}</li>
                                <li>{item.E}</li>
                            </ul>
                        </div>
                    )
                }) : data.map((item, index) => {
                    return (
                        <div key={index}>

                            <ul>
                                <li>{item.A}</li>
                                <li>{item.B}</li>
                                <li>{item.C}</li>
                                <li>{item.E}</li>
                            </ul>
                        </div>
                    )
                })

            }

        </div>
    );
}

export default App;
