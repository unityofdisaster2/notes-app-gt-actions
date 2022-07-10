const chai = require('chai');
const chaiHttp = require('chai-http');
const { after } = require('mocha');
const expect = require('chai').expect;

const { app, server } = require('../index');
chai.use(chaiHttp);

describe('node apps integration test', () => {
	it('should create a note', (done) => {
		chai.request(app)
			.post('/servicio/api_notes_app/notes')
			.set('Content-Type', 'application/json')
			.send({
				"titulo": "test",
				"informacion": "test",
				"nombreCreador": "John Doe",
				"fecha": "2021-02-05"
			})
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			})
	});

	it('should return error 500 because of an incomplete object', (done) => {
		chai.request(app)
			.post('/servicio/api_notes_app/notes')
			.set('Content-Type', 'application/json')
			.send({
				"titulo": "test",
				"nombreCreador": "John Doe",
				"fecha": "2021-02-05"
			})
			.end((err, res) => {
				expect(res).to.have.status(500);
				expect(res.body.errorMsg).to.be.not.null;
				expect(res.body.errorMsg).to.be.equals('no ha sido posible crear la nota');
				done();
			})
	});

	it('should retrieve all notes', (done) => {
		chai.request(app)
			.get('/servicio/api_notes_app/notes')
			.end((err, res) => {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				console.log(res.body);
				done();			
			})
	});

	it('should remove all notes', (done) => {
		chai.request(app)
		.delete('/servicio/api_notes_app/notes')
		.end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			done();			
		})
	})

});