export default function mapProduct(data, search) {
    let productMapped = []
    for (let i of data) {
        i.categoria.map(e => { if (e.nombre == search) productMapped.push(i) })
        // i.map(e => console.log(e.nombre))
    }
    return productMapped
}