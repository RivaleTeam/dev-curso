import useSWR from "swr";



function CapsLock(params) {
    const text = params.Texto.toUpperCase();
    console.log(params)
    return text
}

async function fetchStatus(key){
    const response = await fetch(key);
    const responseBody = await response.json();
    return responseBody;
}

export default function StatusPage(params) {

    //const response = useSWR("status", fetchStatus)
    const response = useSWR("/api/v1/status", fetchStatus, {
        refreshInterval:2000
    })
    //console.log(response.isLoading);
    //console.log(response.data);

    return (
        <>
            <h1>teste</h1>
            <CapsLock Texto="text"/>
            <pre>{JSON.stringify(response.data, null, 2)}</pre>
            <UpdateAt />
        </>
    )
}

function UpdateAt(){
    const {isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
        refreshInterval:2000
    })

    let ultimaData = "Carregando...";

    if (!isLoading && data) {
        ultimaData = new Date(data.update_at).toLocaleString();
    }

    return <div>Ultima data: {ultimaData}</div>
}