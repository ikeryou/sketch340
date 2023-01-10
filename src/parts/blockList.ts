import { MyObject3D } from "../webgl/myObject3D";
import vt from '../glsl/block.vert';
import fg from '../glsl/block.frag';
import { SphereGeometry } from 'three/src/geometries/SphereGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Color } from 'three/src/math/Color';
import { DoubleSide } from 'three/src/constants';
import { Block } from "./block";
import { Func } from '../core/func';
import { Tween } from '../core/tween';
import { Scroller } from '../core/scroller';
import { Util } from '../libs/util';

export class BlockList extends MyObject3D {

  private _item: Array<Block> = [];
  private _mat: Array<ShaderMaterial> = [];
  private _heightEl:HTMLElement;
  private _scroll: number = 0;

  constructor() {
    super();

    this._heightEl = document.createElement('div');
    document.body.append(this._heightEl);
    this._heightEl.classList.add('js-height')

    // 必要なマテリアル作っておく
    for(let i = 0; i < 4; i++) {
      this._mat.push(new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        depthTest:false,
        side: DoubleSide,
        uniforms:{
          color:{value:new Color([0x0000ff, 0xfefcec, 0xfefcec, 0xfefcec][i])},
          alpha:{value:1},
          time:{value:Util.instance.randomInt(0, 1000)},
        }
      }));
    }

    const geoFill = new SphereGeometry(0.24, 64, 64);

    // アイテム
    for(let i = 0; i < 100; i++) {
      const item = new Block({
        id: 0,
        matFill: this._mat,
        geoFill: geoFill,
      });
      this.add(item);
      this._item.push(item);
    }
  }


  protected _update():void {
    super._update();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    let scroll = Scroller.instance.val.y;
    this._scroll += (scroll - this._scroll) * 0.1;

    this._item.forEach((val,i) => {
      const rad = Util.instance.radian((360 / this._item.length) * i);
      const radius = sw * Func.instance.val(0.25, 0.15);
      const x = Math.sin(rad) * radius;
      const y = Math.cos(rad) * radius;

      const rad2 = Util.instance.radian((360 / this._item.length) * (i + 1));
      const x2 = Math.sin(rad2) * radius;
      const y2 = Math.cos(rad2) * radius;

      const dx = x - x2;
      const dy = y - y2;
      const d = Math.sqrt(dx * dx + dy * dy);

      let scroll2 = Math.max(0, this._scroll - i * 0);
      let ang = scroll2 * 0.25;
      ang = Math.max(0, ang);

      val.update({
        size: d * 1,
        ang: ang * -1,
      });

      val.position.x = x;
      val.position.y = y;

      val.rotation.z = Math.atan2(dy, dx);
      // val.rotation.y = Math.atan2(dy, dx);
      // val.rotation.x = Math.atan2(dy, dx);
    })

    Tween.instance.set(this._heightEl, {
      top: sh * 5,
    })

    this._mat.forEach((val) => {
      const uni = val.uniforms;
      uni.time.value += 1;
    })
  }
}