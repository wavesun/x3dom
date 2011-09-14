function setup()
{
  var m_2x2 = [
    Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100
  ];
  
  var m_3x3 = [
    Math.random() * 100, Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100, Math.random() * 100
  ];
  
  var m_4x4 = [
    Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100,
    Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100
  ];
  
  var v_2 = [
    Math.random() * 100,
    Math.random() * 100
  ];
  
  var v_3 = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ];
  
  var v_4 = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ];
  
  // Math
  var v2_0_math       = math.vec2.create(v_2);
  var v2_1_math       = math.vec2.create(v_2);
  var v2_2_math       = math.vec2.create();
  
  var v3_0_math       = math.vec3.create(v_3);
  var v3_1_math       = math.vec3.create(v_3);
  var v3_2_math       = math.vec3.create();
  
  var v4_0_math       = math.vec4.create(v_4);
  var v4_1_math       = math.vec4.create(v_4);
  var v4_2_math       = math.vec4.create();
  
  var m4_0_math       = math.mat4x4.create(m_4x4);
  var m4_1_math       = math.mat4x4.create(m_4x4);
  var m4_2_math       = math.mat4x4.create();
  
  // X3DOM
  var v2_0_x3dom      = new x3dom.fields.SFVec2f(v_3[0], v_3[1]);
  var v2_1_x3dom      = new x3dom.fields.SFVec2f(v_3[0], v_3[1]);
  var v2_2_x3dom      = new x3dom.fields.SFVec2f();
  
  var v3_0_x3dom      = new x3dom.fields.SFVec3f(v_3[0], v_3[1], v_3[2]);
  var v3_1_x3dom      = new x3dom.fields.SFVec3f(v_3[0], v_3[1], v_3[2]);
  var v3_2_x3dom      = new x3dom.fields.SFVec3f();
  
  var m4_0_x3dom      = new x3dom.fields.SFMatrix4f(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_1_x3dom      = new x3dom.fields.SFMatrix4f(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_2_x3dom      = new x3dom.fields.SFMatrix4f();
  
  // GLMatrix
  var v3_0_glmatrix   = vec3.create([v_2[0], v_2[1], v_2[2]]);
  var v3_1_glmatrix   = vec3.create([v_2[0], v_2[1], v_2[2]]);
  var v3_2_glmatrix   = vec3.create();
  
  
  var m4_0_glmatrix   = mat4.create(m_4x4);
  var m4_1_glmatrix   = mat4.create(m_4x4);
  var m4_2_glmatrix   = mat4.create();
  
  // mjs
  var v3_0_mjs        = V3.$(v_3[0], v_3[1], v_3[2]);
  var v3_1_mjs        = V3.$(v_3[0], v_3[1], v_3[2]);
  var v3_2_mjs        = V3.$();
  
  var m4_0_mjs        = M4x4.$(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_1_mjs        = M4x4.$(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_2_mjs        = M4x4.$();
  
  // sylvester
  var v2_0_sylvester  = Vector.create([v_2[0], v_2[1]]);
  var v2_1_sylvester  = Vector.create([v_2[0], v_2[1]]);
  var v2_2_sylvester  = Vector.create([0, 0]);
  
  var v3_0_sylvester  = Vector.create([v_3[0], v_3[1], v_3[2]]);
  var v3_1_sylvester  = Vector.create([v_3[0], v_3[1], v_3[2]]);
  var v3_2_sylvester  = Vector.create([0, 0, 0]);
  
  var v4_0_sylvester  = Vector.create([v_4[0], v_4[1], v_4[2], v_4[3]]);
  var v4_1_sylvester  = Vector.create([v_4[0], v_4[1], v_4[2], v_4[3]]);
  var v4_2_sylvester  = Vector.create([0, 0, 0, 0]);
  
  var m4_0_sylvester  = Matrix.create([m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03]],[m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07]],[m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11]],[m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]]);
  var m4_1_sylvester  = Matrix.create([m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03]],[m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07]],[m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11]],[m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]]);
  var m4_2_sylvester  = Matrix.create([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  
  // TESTS //////////////////////////////////////
  
  math.mat4x4.inverse(m4_0_math);
  math.mat4x4.inverse(m4_0_math);
  console.log(m4_0_math);
  
  var m_x2 = m4_0_x3dom.inverse();
  var m_x3 = m_x2.inverse();
  console.log(m_x3);
  
  // TESTS //////////////////////////////////////
  
  // vec2
  create_test("vec2 (add)", [
    function() { math.vec2.add(v2_0_math, v2_1_math, v2_2_math); },
    function() { v2_2_x3dom = v2_0_x3dom.add(v2_1_x3dom); },
    {},
    {},
    function() { v2_2_sylvester = v2_0_sylvester.add(v2_1_sylvester); }
  ]);
  
  create_test("vec2 (subtract)", [
    function() { math.vec2.subtract(v2_0_math, v2_1_math, v2_2_math); },
    function() { v2_2_x3dom = v2_0_x3dom.subtract(v2_1_x3dom); },
    {},
    {},
    function() { v2_2_sylvester = v2_0_sylvester.subtract(v2_1_sylvester); }
  ]);
  
  create_test("vec2 (dot)", [
    function() { var temp = math.vec2.dot(v2_0_math, v2_1_math); },
    function() { var temp = v2_0_x3dom.dot(v2_1_x3dom); },
    {},
    {},
    function() { var temp = v2_0_sylvester.dot(v2_1_sylvester); }
  ]);
  
  create_test("vec2 (negate)", [
    function() { math.vec2.negate(v2_0_math); },
    function() { v2_1_x3dom = v2_0_x3dom.negate(); }
  ]);
  
  create_test("vec2 (length)", [
    function() { var temp = math.vec2.length(v2_0_math); },
    function() { var temp = v2_0_x3dom.length(); },
    {},
    {},
    function() { var temp = v2_0_sylvester.modulus(); }
  ]);
  
  create_test("vec2 (normalize)", [
    function() { math.vec2.normalize(v2_0_math); },
    function() { v2_1_x3dom = v2_0_x3dom.normalize(); },
    {},
    {},
    function() { v2_1_sylvester = v2_0_sylvester.toUnitVector(); }
  ]);
  
  // vec3
  create_test("vec3 (add)", [
    function() { math.vec3.add(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.add(v3_1_x3dom); },
    function() { vec3.add(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
    function() { V3.add(v3_0_mjs, v3_1_mjs, v3_2_mjs); },
    function() { v3_2_sylvester = v3_0_sylvester.add(v3_1_sylvester); }
  ]);
  
  create_test("vec3 (subtract)", [
    function() { math.vec3.subtract(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.subtract(v3_1_x3dom); },
    function() { vec3.subtract(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
    function() { V3.sub(v3_0_mjs, v3_1_mjs, v3_2_mjs); },
    function() { v3_2_sylvester = v3_0_sylvester.subtract(v3_1_sylvester); }
  ]);
  
  create_test("vec3 (dot)", [
    function() { var temp = math.vec3.dot(v3_0_math, v3_1_math); },
    function() { var temp = v3_0_x3dom.dot(v3_1_x3dom); },
    function() { var temp = vec3.dot(v3_0_glmatrix, v3_1_glmatrix); },
    function() { var temp = V3.lengthSquared(m4_0_mjs) },
    function() { var temp = v3_0_sylvester.dot(v3_1_sylvester); }
  ]);
  
  create_test("vec3 (negate)", [
    function() { math.vec3.negate(v3_0_math); },
    function() { v3_1_x3dom = v3_0_x3dom.negate(); },
    function() { vec3.negate(v3_0_glmatrix, v3_1_glmatrix); },
    function() { V3.neg(v3_0_mjs, v3_1_mjs); },
    {}
  ]);
  
  create_test("vec3 (length)", [
    function() { var temp = math.vec3.length(v3_0_math); },
    function() { var temp = v3_0_x3dom.length(); },
    function() { var temp = vec3.length(v3_0_glmatrix); },
    function() { var temp = V3.length(m4_0_mjs); },
    function() { var temp = v3_0_sylvester.modulus(); }
  ]);
  
  create_test("vec3 (normalize)", [
    function() { math.vec3.normalize(v3_0_math); },
    function() { v3_1_x3dom = v3_0_x3dom.normalize(); },
    function() { vec3.normalize(v3_0_glmatrix); },
    function() { V3.normalize(m4_0_mjs, m4_1_mjs); },
    function() { v3_1_sylvester = v3_0_sylvester.toUnitVector(); }
  ]);
  
  create_test("vec3 (cross)", [
    function() { math.vec3.cross(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.cross(v3_1_x3dom); },
    function() { vec3.cross(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
    function() { V3.cross(m4_0_mjs, m4_1_mjs, m4_2_mjs) },
    function() { v3_2_sylvester = v3_0_sylvester.cross(v3_1_sylvester); }
  ]);
  
  // vec4
  create_test("vec4 (add)", [
    function() { math.vec4.add(v4_0_math, v4_1_math, v4_2_math); },
    {},
    {},
    {},
    function() { v4_2_sylvester = v4_0_sylvester.add(v4_1_sylvester); }
  ]);
  
  create_test("vec4 (subtract)", [
    function() { math.vec4.subtract(v4_0_math, v4_1_math, v4_2_math); },
    {},
    {},
    {},
    function() { v4_2_sylvester = v4_0_sylvester.subtract(v4_1_sylvester); }
  ]);
  
  create_test("vec4 (dot)", [
    function() { var temp = math.vec4.dot(v4_0_math, v4_1_math); },
    {},
    {},
    {},
    function() { var temp = v4_0_sylvester.dot(v4_1_sylvester); }
  ]);
  
  create_test("vec4 (negate)", [
    function() { math.vec4.negate(v4_0_math); }
  ]);
  
  create_test("vec4 (length)", [
    function() { var temp = math.vec4.length(v4_0_math); },
    {},
    {},
    {},
    function() { var temp = v4_0_sylvester.modulus(); }
  ]);
  
  create_test("vec4 (normalize)", [
    function() { math.vec4.normalize(v4_0_math); },
    {},
    {},
    {},
    function() { v4_1_sylvester = v4_0_sylvester.toUnitVector(); }
  ]);
  
  // matrix 4x4
  create_test("mat4x4 (single values)", [
    function() { var temp = math.mat4x4.create(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16); },
    function() { var temp = new x3dom.fields.SFMatrix4f(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16); },
    {},
    function() { var temp = M4x4.$(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]); }
  ]);

  create_test("mat4x4 (array)", [
    function() { var temp = math.mat4x4.create([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]); },
    {},
    function() { var temp = mat4.create([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]); }
  ]);
  
  create_test("mat4x4 (indentity)", [
    function() { var temp = math.mat4x4.create(); },
    function() { var temp = new x3dom.fields.SFMatrix4f(); },
    function() { var temp = mat4.create(); mat4.identity(temp); },
    function() { var temp = M4x4.clone(M4x4.identity); }
  ]);
  
  create_test("mat4x4 (add)", [
    function() { math.mat4x4.add(m4_0_math, m4_1_math, m4_2_math); },
    function() { m4_2_x3dom = m4_0_x3dom.add(m4_1_x3dom); }
  ]);
  
  create_test("mat4x4 (mult)", [
    function() { math.mat4x4.mult(m4_0_math, m4_1_math, m4_2_math); },
    function() { m4_2_x3dom = m4_0_x3dom.mult(m4_1_x3dom); },
    function() { mat4.multiply(m4_0_glmatrix, m4_1_glmatrix, m4_2_glmatrix); },
    function() { M4x4.mul(m4_0_mjs, m4_1_mjs, m4_2_mjs); }
  ]);
  
  create_test("mat4x4 (transpose)", [
    function() { math.mat4x4.transpose(m4_0_math); },
    function() { m4_0_x3dom = m4_0_x3dom.transpose(); },
    function() { mat4.transpose(m4_0_glmatrix); },
  ]);
  
  create_test("mat4x4 (inverse)", [
    {},
    function() { m4_0_x3dom = m4_0_x3dom.inverse(); },
    function() { mat4.inverse(m4_0_glmatrix, m4_1_glmatrix); },
    function() { M4x4.inverseOrthonormal(m4_0_mjs, m4_1_mjs);},
    function() { m4_1_sylvester = m4_0_sylvester.inverse(); }
  ]);

  
  // TESTS //////////////////////////////////////
}