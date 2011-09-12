function setup()
{
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
  
  // GLMatrix
  
  var v3_0_glmatrix = vec3.create([v_2[0], v_2[1], v_2[2]]);
  var v3_1_glmatrix = vec3.create([v_2[0], v_2[1], v_2[2]]);
  var v3_2_glmatrix = vec3.create();
  
  var m4_0_glmatrix = mat4.create(m_4x4);
  var m4_1_glmatrix = mat4.create(m_4x4);
  var m4_2_glmatrix = mat4.create();
  
  // X3DOM
  
  var v2_0_x3dom    = new x3dom.fields.SFVec2f(v_3[0], v_3[1]);
  var v2_1_x3dom    = new x3dom.fields.SFVec2f(v_3[0], v_3[1]);
  var v2_2_x3dom    = new x3dom.fields.SFVec2f();
  
  var v3_0_x3dom    = new x3dom.fields.SFVec3f(v_3[0], v_3[1], v_3[2]);
  var v3_1_x3dom    = new x3dom.fields.SFVec3f(v_3[0], v_3[1], v_3[2]);
  var v3_2_x3dom    = new x3dom.fields.SFVec3f();
  
  var m4_0_x3dom    = new x3dom.fields.SFMatrix4f(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_1_x3dom    = new x3dom.fields.SFMatrix4f(m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03], m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07], m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11], m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]);
  var m4_2_x3dom    = new x3dom.fields.SFMatrix4f();
  
  // Math
  
  var v2_0_math     = math.vec2.create(v_2);
  var v2_1_math     = math.vec2.create(v_2);
  var v2_2_math     = math.vec2.create();
  
  var v3_0_math     = math.vec3.create(v_3);
  var v3_1_math     = math.vec3.create(v_3);
  var v3_2_math     = math.vec3.create();
  
  var v4_0_math     = math.vec4.create(v_4);
  var v4_1_math     = math.vec4.create(v_4);
  var v4_2_math     = math.vec4.create();
  
  var m4_0_math     = math.mat4x4.create(m_4x4);
  var m4_1_math     = math.mat4x4.create(m_4x4);
  var m4_2_math     = math.mat4x4.create();
  
  // TESTS //////////////////////////////////////
  
  
  
  // TESTS //////////////////////////////////////

  // init
  create_test("mat4x4 (indentity)", [
    function() { var temp = math.mat4x4.create(); },
    function() { var temp = new x3dom.fields.SFMatrix4f(); },
    function() { var temp = mat4.create(); mat4.identity(temp); }
  ]);

  create_test("mat4x4 (single values)", [
    function() { var temp = math.mat4x4.create(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16); },
    function() { var temp = new x3dom.fields.SFMatrix4f(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16); },
    {}
  ]);

  create_test("mat4x4 (array)", [
    function() { var temp = math.mat4x4.create([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]); },
    {},
    function() { var temp = mat4.create([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]); }
  ]);
  
  // add
  create_test("add (vec2)", [
    function() { math.vec2.add(v2_0_math, v2_1_math, v2_2_math); },
    function() { v2_2_x3dom = v2_0_x3dom.add(v2_1_x3dom); },
    {},
  ]);
  
  create_test("add (vec3)", [
    function() { math.vec3.add(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.add(v3_1_x3dom); },
    function() { vec3.add(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
  ]);
  
  create_test("add (vec4)", [
    function() { math.vec4.add(v4_0_math, v4_1_math, v4_2_math); },
    {},
    {}
  ]);
  
  create_test("add (mat4x4)", [
    function() { math.mat4x4.add(m4_0_math, m4_1_math, m4_2_math); },
    function() { m4_2_x3dom = m4_0_x3dom.add(m4_1_x3dom); },
    {},
  ]);
  
  // subtract
  create_test("subtract (vec2)", [
    function() { math.vec2.subtract(v2_0_math, v2_1_math, v2_2_math); },
    function() { v2_2_x3dom = v2_0_x3dom.subtract(v2_1_x3dom); },
    {},
  ]);
  
  create_test("subtract (vec3)", [
    function() { math.vec3.subtract(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.subtract(v3_1_x3dom); },
    function() { vec3.subtract(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
  ]);
  
  create_test("subtract (vec4)", [
    function() { math.vec4.subtract(v4_0_math, v4_1_math, v4_2_math); },
    {},
    {}
  ]);
  
  // mult
  create_test("mult (mat4x4)", [
    function() { math.mat4x4.mult(m4_0_math, m4_1_math, m4_2_math); },
    function() { m4_2_x3dom = m4_0_x3dom.mult(m4_1_x3dom); },
    function() { mat4.multiply(m4_0_glmatrix, m4_1_glmatrix, m4_2_glmatrix); },
  ]);
  
  // length
  create_test("length (vec2)", [
    function() { var temp = math.vec2.length(v2_0_math); },
    function() { var temp = v2_0_x3dom.length(); },
    {},
  ]);
  
  create_test("length (vec3)", [
    function() { var temp = math.vec3.length(v3_0_math); },
    function() { var temp = v3_0_x3dom.length(); },
    function() { var temp = vec3.length(v3_0_glmatrix); },
  ]);
  
  create_test("length (vec4)", [
    function() { var temp = math.vec4.length(v4_0_math); },
    {},
    {}
  ]);
  
  // transpose
  create_test("transpose (mat4x4)", [
    function() { math.mat4x4.transpose(m4_0_math); },
    function() { m4_0_x3dom = m4_0_x3dom.transpose(); },
    function() { mat4.transpose(m4_0_glmatrix); },
  ]);
  
  // normalize
  create_test("normalize (vec2)", [
    function() { math.vec2.normalize(v2_0_math); },
    {},
    {},
  ]);
  
  create_test("normalize (vec3)", [
    function() { math.vec3.normalize(v3_0_math); },
    function() { v3_1_x3dom = v3_0_x3dom.normalize(); },
    function() { vec3.normalize(v3_0_glmatrix); },
  ]);
  
  create_test("normalize (vec4)", [
    function() { math.vec4.normalize(v4_0_math); },
    {},
    {}
  ]);
  
  // dot
  create_test("dot (vec2)", [
    function() { var temp = math.vec2.dot(v2_0_math, v2_1_math); },
    function() { var temp = v2_0_x3dom.dot(v2_1_x3dom); },
    {},
  ]);
  
  create_test("dot (vec3)", [
    function() { var temp = math.vec3.dot(v3_0_math, v3_1_math); },
    function() { var temp = v3_0_x3dom.dot(v3_1_x3dom); },
    function() { var temp = vec3.dot(v3_0_glmatrix, v3_1_glmatrix); },
  ]);
  
  create_test("dot (vec4)", [
    function() { var temp = math.vec4.dot(v4_0_math, v4_1_math); },
    {},
    {}
  ]);
  
  // cross
  create_test("cross (vec3)", [
    function() { math.vec3.cross(v3_0_math, v3_1_math, v3_2_math); },
    function() { v3_2_x3dom = v3_0_x3dom.cross(v3_1_x3dom); },
    function() { vec3.cross(v3_0_glmatrix, v3_1_glmatrix, v3_2_glmatrix); },
  ]);
  
  // TESTS //////////////////////////////////////
}