
const Producto = require("../routes/models/Producto");


exports.crearProducto = async (req, res) => {
    
    try{
        let producto;

        // creamos nuestro producto
const Producto = require("../routes/models/Producto");
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);

    } catch(cerror){
        console.log(error);
        res.status(500).send('ERROR');
    }

}

exports.obtenerProductos = async (req, res) => {

    try {
        const productos =await Producto.find();
        res.json(productos)
    
    } catch(cerror) {
    console.log(error);
    res.status(500).send('ERROR');
    }
}

exports.actualizarProducto = async (req, res) => {

    try {
        const {nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: 'No existe el producto'})

        }
            producto.nombre = nombre;
            producto.categoria = categoria;
            producto.ubicacion = ubicacion;
            producto.precio = precio;

            producto = await Producto.findOneAndUpdate({ _id: req.params.id },producto, {new: true} )
            res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR');
    }
}
exports.obtenerProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: 'No existe el producto' })

        }
            
            res.json(producto);
        
    } catch (error) {

        console.log(error);
        res.status(500).send('ERROR');
    }
}

exports.eliminarProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto'})

        }
            await Producto.findByIdAndRemove({_id: req.params.id })
            res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send('ERROR');
    }
}