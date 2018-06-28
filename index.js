const moment = require('moment');
const stream = require('stream');
const fs = require('fs');
console.log(moment().format('LTS'));

const { Readable , Writable , Transform } = stream;

const rs = new Readable({
	read(size){
		setTimeout(() => { ti = new Date().getTime();console.log(ti);this.push(ti.toString());},1000);
		
	}
});
const ws = new Writable({
	write(chunk,enc,callback){
		console.log(chunk.toString());
		fs.appendFile('data.txt',(chunk.toString() + '\r\n'));
		callback();
	}
});
const tr = new Transform({
	transform(chunk,encoding,callback){
		const n = moment(+chunk.toString()).format("MMMM Do YYYY, h:mm:ss a");
		this.push(`${n}`);
		callback();
	}
});
rs.pipe(tr).pipe(ws);
