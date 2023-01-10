import { MyObject3D } from "../webgl/myObject3D";
import { Object3D } from 'three/src/core/Object3D';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Util } from '../libs/util';
import { Mesh } from 'three/src/objects/Mesh';

export class Block extends MyObject3D {

  private _id: number;
  private _con: Object3D;

  constructor(opt:{
    id: number,
    matFill: Array<ShaderMaterial>,
    geoFill: any,
  }) {
    super();

    this._id = opt.id;

    this._con = new Object3D();
    this.add(this._con);

    for(let i = 0; i < 4; i++) {
      const m = new Mesh(
        opt.geoFill,
        opt.matFill[(i + this._id) % opt.matFill.length]
      );
      this._con.add(m);
    }

    this._con.children.forEach((val,i) => {
      const hososa = 1;
      const hososa2 = 20;
      const nagasa = 25;
      val.scale.set(hososa, nagasa * 2, hososa);

      if(i == 0) {
        val.position.set(0, 0, 0.5);
        val.rotation.set(0, 0, 0);
        val.scale.set(hososa2, nagasa, hososa2);
      }

      if(i == 1) {
        val.position.set(0, -0.5, 0);
        val.rotation.set(Util.rdn(-270), 0, 0);
      }

      if(i == 2) {
        val.position.set(0, 0, -0.5);
        val.rotation.set(Util.rdn(180), 0, 0);
      }

      if(i == 3) {
        val.position.set(0, 0.5, 0);
        val.rotation.set(Util.rdn(-90), 0, 0);
      }
    });

    this._resize();
  }


  public update(opt: {size: number, ang: number}):void {
    const s = opt.size;
    this._con.scale.set(s, s, s);

    this._con.position.z = -opt.size * 0.5;
    this._con.rotation.x = Util.rdn(opt.ang * 1);
  }
}