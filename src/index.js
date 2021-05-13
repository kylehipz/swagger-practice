import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import * as swagger from 'swagger2';

// import routes
import { routes as registerRoute } from './routes/register';
import { routes as loginRoute } from './routes/login';

// init
const app = express();
const router = express.Router();

app.use(bodyParser());

// load swagger file
const spec = swagger.loadDocumentSync('./src/swagger.yaml');

// check if swagger file is valid
if (!swagger.validateDocument(spec)) {
  throw new Error(`Invalid Swagger File`);
}

// map imported routes
for (const routes of [registerRoute, loginRoute]) {
  routes(router);
}

// use swagger ui
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(spec));

router.get('/swagger.json', (req, res) => {
  res.send(spec);
});

app.use('/v1', router);

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
