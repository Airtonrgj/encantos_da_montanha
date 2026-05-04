import Cliente from "../domain/entities/Cliente.js";
import Suite from "../domain/entities/Suite.js";
import Experiencia  from "../domain/entities/Experiencia.js";

const clienteImg = new Cliente("Marina", "marina.fonseca@somosicev.com", "(86)99961-8959")
console.log(clienteImg)
const suitImag = new Suite("01","balalau","boa pra peste","img")
console.log(suitImag)
const experiencImg = new Experiencia("01", "acampar", "uma noite")
console.log(experiencImg)