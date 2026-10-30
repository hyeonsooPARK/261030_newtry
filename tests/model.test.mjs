import test from 'node:test';
import assert from 'node:assert/strict';
import {predict,total,categories} from '../src/model.js';
test('category totals reconcile with the displayed total',()=>assert.equal(total,1248000));
test('one-off planned spend is only added to first month',()=>{
 const base=predict({months:3}),extra=predict({months:3,extra:500000});
 assert.equal(extra[0]-base[0],500000);assert.equal(extra[1],base[1]);assert.equal(extra[2],base[2]);
});
test('category and payment method affect the forecast',()=>{
 const food=predict({selected:['식비'],method:'credit'});
 assert.equal(food[0],Math.round(384000*.92*1.08));
 assert.ok(food[0]<predict({})[0]);
});
test('custom horizon supports full 36-month result',()=>assert.equal(predict({months:36}).length,36));
