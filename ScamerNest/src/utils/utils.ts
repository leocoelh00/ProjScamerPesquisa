export function Get_Mimetype(nm_Arquivo: string) {
    nm_Arquivo = nm_Arquivo.toLocaleLowerCase()

    if (nm_Arquivo.includes(".pdf")) {
        return "application/pdf"
    } else if (nm_Arquivo.includes(".zip")) {
        return "application/x-zip"
    } else if (nm_Arquivo.includes(".txt")) {
        return "text/plain"
    } else if (nm_Arquivo.includes(".png")) {
        return "image/png"
    } else if (nm_Arquivo.includes(".jpg") || nm_Arquivo.includes(".jpeg")) {
        return "image/jpeg"
    } else {
        return "octet/stream"
    }
}

export function Get_Query_Params(object: any[], field: string) {
    return `${field}=${object.join("&" + field + "=")}`
}