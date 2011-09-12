function setup()
{
  var fields_mat4x4;
  var math_mat4x4;
  var glmatrix_mat4x4;
  
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
  
  //
  
  v3_0_glmatrix = vec3.create([v_2[0], v_2[1], v_2[2]]);
  v3_1_glmatrix = vec3.create();
  
  m0_0_glmatrix = mat4.create(m_4x4);
  
  //
  
  v3_0_x3dom    = new x3dom.fields.SFVec3f(v_3[0], v_3[1], v_3[2]);
  v3_1_x3dom    = new x3dom.fields.SFVec3f();
  
  m0_0_x3dom    = new x3dom.fields.SFMatrix4f(
    m_4x4[00], m_4x4[01], m_4x4[02], m_4x4[03],
    m_4x4[04], m_4x4[05], m_4x4[06], m_4x4[07],
    m_4x4[08], m_4x4[09], m_4x4[10], m_4x4[11],
    m_4x4[12], m_4x4[13], m_4x4[14], m_4x4[15]
  );
  
  //
  
  v2_0_math     = math.vec2.create([v_2[0], v_2[1]]);
  v2_1_math     = math.vec2.create();
  
  v3_0_math     = math.vec3.create([v_2[0], v_2[1], v_2[2]]);
  v3_1_math     = math.vec3.create();
  
  v4_0_math     = math.vec4.create([v_4[0], v_4[1], v_4[2], v_4[3]]);
  v4_1_math     = math.vec4.create();
  
  m0_0_math     = math.mat4x4.create(m_4x4);


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

  create_test("vec2 (normalize)", [
    function() { math.vec2.normalize(v2_0_math); },
    {},
    {},
  ]);
  
  create_test("vec3 (normalize)", [
    function() { math.vec3.normalize(v3_0_math); },
    function() { v3_1_x3dom = v3_0_x3dom.normalize(); },
    function() { vec3.normalize(v3_0_glmatrix); },
  ]);
  
  create_test("vec4 (normalize)", [
    function() { math.vec4.normalize(v4_0_math); },
    {},
    {}
  ]);
}