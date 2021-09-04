const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

import { routes } from "@/routes/index";

const PORT = process.env.PORT || 3333;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

require("@/infra/context/index");

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
