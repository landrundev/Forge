import { useState, useMemo, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  FORGE — AI-Powered Professional Training Platform v15
//  Light theme · Smart lifts · Edit/Delete · Dashboard Today view
// ═══════════════════════════════════════════════════════════════

const T = {
  bg:"#FAFAFA",surface:"#F0F1F3",card:"#FFFFFF",
  border:"#E0E2E7",borderLight:"#D0D3DA",
  accent:"#5B5FC7",text:"#1A1D23",sub:"#5A6070",dim:"#8B93A5",
  green:"#22C55E",red:"#EF4444",blue:"#3B82F6",purple:"#7C5CFC",
  cyan:"#0EA5E9",pink:"#A855F7",
  quads:"#3B82F6",hams:"#22C55E",glutes:"#A855F7",core:"#0EA5E9",
  calves:"#64748B",back:"#6366F1",chest:"#EC4899",arms:"#F97316",
};
const MC={Quads:T.quads,Hamstrings:T.hams,Glutes:T.glutes,Core:T.core,Calves:T.calves,Back:T.back,Biceps:T.arms,Triceps:T.arms,Chest:T.chest,Shoulders:T.back,Adductors:T.glutes};
const TC={quad:T.quads,glute:T.glutes,upper:T.back,lower:T.hams,push:T.chest,pull:T.back,full:T.purple};

const MM={"5-5-5 Curl":["Biceps"],"7-7-7 Curl":["Biceps"],"8-8-8 Bicep Curl":["Biceps"],"Ab Rollout":["Core"],"Ab Rotation":["Core"],"Adductor Plate Slide":["Adductors"],"Alt Bird Dog":["Core"],"Alt V-Up":["Core"],"Arnold Press":["Shoulders"],"Around the World":["Shoulders"],"Assisted Bent Leg Calf Raise":["Calves"],"B Stance Back Squat":["Quads","Glutes"],"B Stance Goblet Squat":["Glutes","Quads"],"BW Bench Step Down":["Quads","Glutes"],"BW Bent Knee Calf Raise":["Calves"],"BW Calf Raise":["Calves"],"BW Curtsy Lunge":["Quads","Glutes"],"BW Jump Squat":["Glutes","Quads"],"BW Sumo Squat":["Glutes","Quads"],"BW Walking Lunge":["Glutes","Quads"],"Back Squat":["Quads","Glutes"],"Ballerina Bulgarian":["Quads","Glutes"],"Band Curl":["Biceps"],"Band Hold Leg Lift":["Core"],"Band Pull Apart":["Back"],"Band Scap Abduction":["Back"],"Band Shoulder Capsule Stretch":[],"Band Shoulder Circle":[],"Band Shoulder Stretch":[],"Band Y/T/W":["Back","Shoulders"],"Banded Abductor":["Glutes"],"Banded Abductor Pulse":["Glutes"],"Banded Adductor":["Adductors"],"Banded Adductor Pulse":["Adductors"],"Banded Chest Press":["Chest"],"Banded Clamshell":["Glutes"],"Banded Deadbug":["Core"],"Banded Glute Bridge":["Glutes"],"Banded Glute Bridge + Pulse":["Glutes"],"Banded Glute Bridge Abductor Pulse":["Glutes"],"Banded Glute Bridge Adductor Pulse":["Glutes"],"Banded Glute Bridge Adductor Slow Down":["Glutes","Adductors"],"Banded Glute Bridge Lat Pullover":["Back","Glutes"],"Banded Glute Bridge March":["Glutes"],"Banded Glute March":["Glutes"],"Banded Hamstring Stretch":[],"Banded Hip Thrust":["Glutes"],"Banded Pigeon":[],"Banded Scooter Hamstring Curls":["Hamstrings"],"Banded Sissy Squat":["Quads"],"Banded Tricep Extension":["Triceps"],"Banded Tricep Kickback":["Triceps"],"Banded Tricep Pushdown":["Triceps"],"Barbell Back Squat":["Quads","Glutes"],"Barbell Bench Press":["Chest"],"Barbell Curl":["Biceps"],"Barbell Deficit RDL":["Glutes","Hamstrings"],"Barbell Hip Thrust":["Glutes"],"Barbell Military Press":["Shoulders"],"Barbell RDL":["Glutes","Hamstrings"],"Barbell Row":["Back"],"Barbell Sumo Deadlift":["Glutes","Hamstrings"],"Barbell Walking Lunge":["Glutes","Quads"],"Beast Wallball Side Rotation":["Core"],"Beast to Plank":["Core"],"Behind the Neck Press":["Shoulders"],"Bench Dip":["Triceps"],"Bench Step Down":["Glutes","Quads"],"Bent Knee Calf Raise":["Calves"],"Bike":[],"Bike Arms Only":[],"Bike Both":[],"Box Crunch":["Core"],"Box Step Over":["Quads","Glutes"],"Box Step Up":["Quads","Glutes"],"Box V-Up":["Core"],"Bulgarian Pulse":["Quads","Glutes"],"Bulgarian Split Jump":["Quads","Glutes"],"Bulgarian Split Pulse BW":["Glutes","Quads"],"Bulgarian Split Squat":["Calves","Glutes","Quads"],"Bulgarian Split to Lunge":["Glutes","Quads"],"Bulgarian into Lunge into Calf Raise":["Quads","Glutes","Calves"],"Butterfly Situp":["Core"],"Cable Crunch":["Core"],"Cable Crunch Hold":["Core"],"Cable Face Pull":["Back","Shoulders"],"Cable Lat Pull Down":["Back"],"Cable Lat Pullover":["Back"],"Cable Row":["Back"],"Cable Tricep Extension":["Triceps"],"Cable Tricep Kickback":["Triceps"],"Calf Raise":["Calves"],"Cardio":[],"Chin Up":["Back","Biceps"],"Clamshells":["Glutes"],"Concentration Curl":["Biceps"],"Copenhagen":["Adductors"],"Copenhagen Lift":["Adductors"],"Copenhagen on Box":["Adductors"],"Cossack Squat":["Adductors","Quads"],"Crunch On Box":["Core"],"Curtsy Lunge":["Glutes","Quads"],"DB Bench Step Down":["Quads","Glutes"],"DB Bent Over Row Into RDL":["Back","Hamstrings"],"DB Bicep Curl":["Biceps","Triceps"],"DB Bulgarian Split Squat":["Glutes","Quads"],"DB Chest Fly":["Chest"],"DB Chest Press":["Chest"],"DB Clean & Squat":["Quads","Shoulders"],"DB Crush Grip Press":["Chest"],"DB Deadbug Crunch":["Core"],"DB Deadlift to Calf Raise":["Calves","Hamstrings"],"DB Front Raise":["Shoulders"],"DB Halo With Twist":["Core"],"DB ISO Hold Bicep Curl":["Biceps"],"DB Incline Chest Press":["Chest"],"DB Incline Crush Grip Press":["Chest"],"DB Lat Pullover":["Back"],"DB Leaning Lateral Raise":["Shoulders"],"DB Lunge Pulse":["Quads","Glutes"],"DB Military Press":["Shoulders"],"DB Push Press":["Biceps","Shoulders"],"DB RDL":["Glutes","Hamstrings"],"DB Reverse Fly":["Back"],"DB Row":["Back"],"DB Side Crunch":["Core"],"DB Single Arm Press March":["Core","Shoulders"],"DB Single Leg RDL":["Hamstrings","Glutes"],"DB Skull Crusher":["Triceps"],"DB Squat to Curtsy Lunge":["Glutes","Quads"],"DB Step Up":["Quads","Glutes"],"DB T Raise":["Shoulders"],"DB Thruster":["Quads","Shoulders"],"DB Walking Lunge":["Glutes","Quads"],"Dead Bug":["Core"],"Deadbug Crunch":["Core"],"Deficit Curtsy Lunge":["Quads","Glutes"],"Deficit Sumo Squat":["Quads","Glutes"],"Demon Crunch on Box":["Core"],"Devil Press":["Shoulders","Quads"],"Diagonal Tricep Cable":["Triceps"],"Diagonal Tricep Extension":["Triceps"],"Elevated Calf Raise":["Calves"],"Elevated Curtsy Lunge":["Quads","Glutes"],"Farmer Carry":["Core"],"Flutter Kick":["Core"],"Front Lunge":["Quads","Glutes"],"GHD":["Glutes","Hamstrings"],"Goblet Squat":["Core","Glutes","Quads"],"Gorilla Row":["Back"],"Ground to Overhead":["Quads","Shoulders"],"Hack Squat":["Quads"],"Hammer Curl":["Biceps"],"Hamstring Curl":["Hamstrings"],"Heel Taps":["Core"],"Hip Flexor":["Core"],"Hip Thrust Hold Adductors":["Adductors","Glutes"],"Hip Thruster":["Glutes"],"Hollow Hold":["Core"],"Incline Chest Press":["Chest"],"Incline Curl":["Biceps"],"Incline DB RDL":["Glutes","Hamstrings"],"Incline Goblet Squat":["Glutes","Quads"],"Incline Hammer Curl":["Biceps"],"Incline Push Up":["Chest"],"Incline Row":["Back"],"Jack Knife V-Up":["Core"],"Jump Lunge":["Quads","Glutes"],"Jump Squat":["Quads","Glutes"],"KB Calf Raise":["Calves"],"KB Clean & Squat":["Quads","Shoulders"],"KB Curl":["Biceps"],"KB Curl to Press":["Biceps","Shoulders"],"KB Elevated Calf Raise":["Calves"],"KB High Pull":["Back","Shoulders"],"KB Kneeling Hip Circle":["Core"],"KB Military Press":["Shoulders"],"KB Shoulder Shrug":["Back"],"KB Squat to High Pull":["Quads","Shoulders"],"KB Suitcase Deadlift":["Hamstrings","Glutes"],"KB Sumo Squat":["Glutes","Quads"],"KB Sumo Squat 1.5":["Quads","Glutes"],"KB Sumo Squat Pulse":["Quads","Glutes"],"KB Swing":["Glutes","Hamstrings"],"Knee Push Up":["Chest"],"Knee Tuck on Box":["Core"],"Kneeling Lat Pulldown":["Back"],"Kneeling Plate Hip Halo":["Core"],"Landmine Hack Squat":["Quads"],"Landmine Kneeling Push Press":["Shoulders"],"Landmine Military Press":["Shoulders"],"Landmine Press":["Shoulders","Chest"],"Landmine RDL":["Hamstrings","Glutes"],"Landmine Rainbow":["Core"],"Landmine Row":["Back"],"Landmine Side Crunch":["Core"],"Landmine Side Drop":["Back","Core"],"Landmine Single Leg Hip Thrust":["Glutes"],"Landmine Sumo Squat":["Quads","Glutes"],"Landmine Thruster":["Quads","Shoulders"],"Lat Pull Over":["Back"],"Lateral Raise":["Shoulders"],"Leg Curl":["Hamstrings"],"Leg Extension":["Quads"],"Leg Lift":["Core"],"Low Plank Hold":["Core"],"Lunge Hold Calf Raise":["Calves"],"Lunge Pulse":["Quads","Glutes"],"Medball Slam":["Core"],"Plank":["Core"],"Plank KB Pull Through":["Core"],"Plank to Beast":["Core"],"Plate Bent Knee Calf Raise":["Calves"],"Plate Calf Raise":["Calves"],"Plate Crunch":["Core"],"Plate Crunch to Leg Raise":["Core"],"Plate Front Raise":["Shoulders"],"Plate Front Raise Press":["Quads","Shoulders"],"Plate Halo":["Core"],"Plate Leg Raise to Situp":["Core"],"Plate March":["Core","Shoulders"],"Plate Overhead Press":["Shoulders"],"Plate Reverse Crunch":["Core"],"Plate Reverse Crunch to Leg Raise":["Core"],"Power Beast":["Core"],"Pull Up":["Back","Biceps"],"Push Up":["Chest"],"Renegade Row":["Back","Core"],"Reverse + Curtsy Lunge":["Glutes","Quads"],"Reverse Lunge":["Glutes","Quads"],"Rig Assisted Step Down":["Quads","Glutes"],"Row Erg":[],"Russian Twist":["Core"],"SL RDL":["Hamstrings","Glutes"],"Sandbag Walking Lunge":["Quads","Glutes"],"Scap Dip":["Back"],"Scap Push Up":["Back"],"Seated DB Reverse Fly":["Back"],"Seated Military Press":["Shoulders"],"Seated Push Press":["Shoulders"],"Seated Shoulder Press":["Shoulders"],"Side Crunch":["Core"],"Side Lunge":["Quads","Glutes"],"Side Lying Abductor":["Glutes"],"Side Plank Dip":["Core"],"Side Plank Hip Dip":["Core"],"Single Arm Banded Lat Pulldown":["Back"],"Single Arm Banded Tricep Extension":["Triceps"],"Single Arm Cable Lat Pulldown":["Back"],"Single Arm Cable Tricep Extension":["Triceps"],"Single Arm DB Military Press":["Shoulders"],"Single Arm DB Press March":["Core","Shoulders"],"Single Arm DB Press Walk":["Core","Shoulders"],"Single Arm DB Row":["Back"],"Single Arm Diagonal Tricep Extension":["Triceps"],"Single Arm Landmine Press":["Shoulders","Chest"],"Single Arm Press March":["Core","Shoulders"],"Single Arm Row":["Back"],"Single Arm Tricep Extension":["Triceps"],"Single Leg Bench Hip Thrust":["Glutes"],"Single Leg Calf Raise":["Calves"],"Single Leg Curl":["Hamstrings"],"Single Leg DB RDL":["Hamstrings","Glutes"],"Single Leg Elevated Calf Raise":["Calves"],"Single Leg Extension":["Quads"],"Single Leg Hip Thrust":["Glutes"],"Single Leg Landmine RDL":["Glutes","Hamstrings"],"Single Leg RDL":["Hamstrings","Glutes"],"Single Leg RDL with Knee Drive":["Glutes","Hamstrings"],"Ski Erg":[],"Skull Crusher":["Triceps"],"Sled Drag":["Hamstrings"],"Sled Push/Drag":["Quads"],"Split Stance Lunge":["Glutes","Quads"],"Squat Hold Step Back":["Glutes","Quads"],"Squat Step Back":["Quads","Glutes"],"Squat to Curtsy Lunge":["Quads","Glutes"],"Standing Military Press":["Shoulders"],"Step Down":["Quads","Glutes"],"Step Down Toe Tap":["Quads","Glutes"],"Step Up":["Quads","Glutes"],"Strict Press":["Shoulders"],"Sumo Squat":["Glutes","Quads"],"Sumo Squat 1.5s":["Glutes","Quads"],"Sumo Squat Plie":["Quads","Glutes"],"Sumo Squat Pulse":["Quads","Glutes"],"Trap Bar Deadlift":["Back","Glutes","Hamstrings"],"Tricep Kickback":["Triceps"],"V-Up":["Core"],"Viking Press":["Shoulders"],"Walking Lunge":["Glutes","Quads"],"Wall Ball Ab Pass":["Core"],"Wall Band Butt Tap":["Glutes"],"Wall Bent Knee Calf Raise":["Calves"],"Wall Sit Hold":["Quads"],"Weighted Deadbug":["Core"],"Weighted Deadbug Crunch":["Core"],"Weighted Shin Box to High Kneel":["Glutes"],"Weighted Situp":["Core"],"Weighted V-Up":["Core"],"Wood Chop":["Core"],"Yoga Ball Squat":["Quads"],"Z Press":["Shoulders","Core"],"Zottman Curl":["Biceps"]};

// ── STORAGE ──────────────────────────────────────────
const S={
  async get(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null}catch{return null}},
  async set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}},
  async del(k){try{localStorage.removeItem(k)}catch{}},
};

// ── SEED DATA ────────────────────────────────────────
const WU={std:"3 min bike, banded side steps",quad:"3 min bike & banded side steps, lower back mobility & sissy squats",glute:"3 min bike, banded side steps x2",upper:"Arm warm up",lower:"3 min bike, banded side steps, leg stretches",rleg:"3 min bike, leg stretch routine, banded side steps",rglute:"Banded side steps, glute activation",abike:"3 min bike, banded side steps",amob:"3 min bike, banded side steps, hip openers (windshield wipers, KB weighted L-stretch)",apvc:"3 min bike, PVC pipe mobility",ahip:"3 min bike, banded side steps, hip wiper progression, forward fold walkouts"};
function mk(d,t,l,wk,blocks){return{id:`${d}-${t}`,date:d,type:t,label:l,warmup:WU[wk]||wk,status:"completed",blocks:blocks.map(b=>({name:b[0],exercises:b.slice(1).map(e=>({name:e[0],sets:e[1],reps:e[2],weight:e[3]||null,notes:e[4]||"",done:true}))}))};}

const SEED_PAT=[
  mk("2024-01-06","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",1,7,185],["Barbell Back Squat",3,7,225]],["Superset – 4 rds",["Leg Extension",4,15,90],["DB Walking Lunge",4,10,50]],["Superset – 3 rds",["Hamstring Curl",3,10,90],["SL RDL",3,8,55]]]),
  mk("2024-01-13","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",2,7,185],["Barbell Back Squat",2,7,225],["Barbell Back Squat",1,10,165]],["Leg Extension – 3 rds",["Leg Extension",3,10,90]],["Sled Push – 3 rds",["Sled Push/Drag",3,1,245]],["Hamstring Curl – 3 rds",["Hamstring Curl",3,10,90]],["SL RDL – 3 rds",["SL RDL",3,8,80]]]),
  mk("2024-01-20","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,135],["Barbell Back Squat",2,7,185],["Barbell Back Squat",2,7,225],["Barbell Back Squat",1,10,165]],["Leg Extension – 3 rds",["Leg Extension",3,12,90]],["Sled Push – 3 rds",["Sled Push/Drag",3,1,245]],["Hamstring Curl – 3 rds",["Hamstring Curl",3,12,90]]]),
  mk("2024-01-27","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,135],["Barbell Back Squat",2,7,185],["Barbell Back Squat",2,7,225],["Barbell Back Squat",1,10,165]],["Leg Extension – 3 rds",["Leg Extension",3,12,90]],["Goblet Squats – 3 rds",["Goblet Squat",3,10,null]],["Hamstring Curl – 3 rds",["Hamstring Curl",3,12,90]],["DB RDL – 3 rds",["DB RDL",3,10,45]]]),
  mk("2024-02-10","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",1,7,185],["Barbell Back Squat",3,7,225]],["Superset – 4 rds",["Leg Extension",4,15,90],["Goblet Squat",4,10,85]],["Superset – 3 rds",["Hamstring Curl",3,10,90],["Reverse Lunge",3,8,50]]]),
  mk("2024-03-31","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,135],["Barbell Back Squat",1,8,185],["Barbell Back Squat",3,6,225]],["Superset – 3 rds",["Leg Extension",3,15,90],["Goblet Squat",3,10,85]],["Superset – 3 rds",["Hamstring Curl",3,15,90],["Reverse Lunge",3,8,50]],["Finisher – 3 rds",["Trap Bar Deadlift",3,8,185]]]),
  mk("2024-06-10","quad","Lower Body","std",[["B Stance Back Squat",["Barbell Back Squat",1,10,135],["B Stance Back Squat",3,8,155]],["Superset – 4 rds",["Leg Extension",4,10,100],["Landmine Thruster",4,10,50]],["Conditioning – 3 rds",["Bike",3,15,null,"15cal"],["GHD",3,10,15]],["Superset – 4 rds",["Hamstring Curl",4,10,100],["Landmine RDL",4,8,null]]]),
  mk("2024-06-17","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,8,185],["Barbell Back Squat",1,6,195],["Barbell Back Squat",1,6,205]],["Core – 4 rds",["Landmine Side Drop",4,10,10],["Dead Bug",4,10,20]],["Circuit – 4 rds",["Row Erg",4,1,null,"500m"],["Leg Extension",4,10,100],["BW Jump Squat",4,10,null],["Leg Curl",4,10,90],["Hack Squat",4,10,50]],["Superset – 4 rds",["DB RDL",4,8,50],["Calf Raise",4,15,null]]]),
  mk("2024-06-24","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,8,185],["Barbell Back Squat",1,6,195],["Barbell Back Squat",1,6,205]],["Glutes/Core – 3 rds",["Banded Glute Bridge",3,10,null],["Leg Lift",3,10,null]],["Circuit – 4 rds",["Bike",4,15,null,"15cal"],["Leg Extension",4,10,115],["Barbell RDL",4,10,null]],["Superset – 4 rds",["Sled Drag",4,1,225],["Calf Raise",4,15,null],["GHD",4,10,null]]]),
  mk("2024-07-08","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",1,7,185],["Barbell Back Squat",3,7,225]],["Superset – 4 rds",["Leg Extension",4,15,90],["DB Walking Lunge",4,10,50]],["Superset – 3 rds",["Hamstring Curl",3,10,90],["SL RDL",3,8,55]],["Conditioning – 4 rds",["Bike",4,20,null,"20cal"],["Sumo Squat",4,15,null],["Calf Raise",4,20,null]]]),
  mk("2024-07-29","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",1,8,185],["Barbell Back Squat",3,6,225]],["Superset – 4 rds",["Leg Curl",4,10,90],["Barbell RDL",4,8,135]],["Superset – 4 rds",["Leg Extension",4,10,90],["Walking Lunge",4,10,null]]]),
  mk("2024-08-25","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",1,8,185],["Barbell Back Squat",3,6,225]],["Core – 3 rds",["V-Up",3,10,15],["Leg Lift",3,20,null]],["Superset – 4 rds",["Leg Extension",4,10,90],["Walking Lunge",4,10,null]]]),
  mk("2024-09-04","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,8,185],["Barbell Back Squat",1,6,195],["Barbell Back Squat",1,6,205]],["Core – 3 rds",["Banded Glute Bridge",3,15,null],["Side Plank Hip Dip",3,10,null]],["Conditioning – 4 rds",["Sled Drag",4,1,225],["Calf Raise",4,15,null]],["Circuit – 4 rds",["Bike",4,15,null,"15cal"],["Leg Curl",4,10,115],["Farmer Carry",4,2,null]]]),
  mk("2024-10-02","quad","Legs + Back","upper",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Superset – 4 rds",["Leg Extension",4,10,90],["DB RDL",4,10,45]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Hack Squat",4,10,null]]]),
  mk("2024-10-06","quad","Leg Day","upper",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Core – 4 rds",["Weighted Situp",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Leg Extension",4,10,90],["Landmine Hack Squat",4,10,45]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Landmine RDL",4,8,25]]]),
  mk("2024-10-27","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",1,8,185],["Barbell Back Squat",3,6,225]],["Core – 4 rds",["Weighted Situp",4,10,null],["Leg Lift",4,20,null]],["Superset – 4 rds",["Leg Extension",4,10,90],["Landmine Hack Squat",4,10,55]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Landmine RDL",4,8,35]]]),
  mk("2024-11-03","quad","Leg Day (Tempo)","upper",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Core – 4 rds",["Weighted Situp",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Leg Extension",4,10,90],["Cossack Squat",4,6,null]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Barbell RDL",4,8,45]]]),
  mk("2024-11-10","quad","Leg Day","upper",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Core – 4 rds",["Weighted Situp",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Single Leg Extension",4,10,55],["Incline Goblet Squat",4,10,35]],["Superset – 4 rds",["Single Leg Curl",4,10,60],["Landmine RDL",4,8,30]]]),
  mk("2024-11-17","quad","Leg Day (Tempo)","upper",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Superset – 4 rds",["Leg Extension",4,8,100],["Cossack Squat",4,6,null]],["Core – 4 rds",["Demon Crunch on Box",4,8,30],["Russian Twist",4,20,30]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"6pl"],["KB Calf Raise",4,15,null]]]),
  mk("2024-11-24","quad","Legs","upper",[["B Stance Back Squat",["Barbell Back Squat",1,10,135],["B Stance Back Squat",3,8,155]],["Superset – 4 rds",["Leg Extension",4,10,105],["Incline Goblet Squat",4,10,55]],["Superset – 4 rds",["Hamstring Curl",4,10,105],["Barbell Deficit RDL",4,10,null]],["Core – 3 rds",["Hollow Hold",3,10,null],["Leg Lift",3,30,null]]]),
  mk("2024-12-15","quad","Quads","upper",[["B Stance Back Squat",["Barbell Back Squat",1,10,135],["B Stance Back Squat",3,8,155]],["Superset – 4 rds",["Leg Extension",4,10,105],["Incline Goblet Squat",4,10,55],["Squat Step Back",4,20,null]],["Core – 4 rds",["Hollow Hold",4,10,null],["Leg Lift",4,20,null]],["Conditioning – 4 rds",["Sandbag Walking Lunge",4,1,null],["Calf Raise",4,12,null]]]),
  mk("2024-12-16","quad","Quad Day","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",1,7,185],["Barbell Back Squat",3,7,225]],["Superset – 4 rds",["Leg Extension",4,10,90],["Goblet Squat",4,10,85]],["Superset – 3 rds",["Hamstring Curl",3,10,90],["Reverse Lunge",3,8,50]]]),
  // 2024 UPPER/BACK
  mk("2024-01-06b","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45]],["Arms – 4 rds",["Barbell Curl",4,10,25],["Lat Pull Over",4,10,90],["Bench Dip",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["Gorilla Row",1,10,null],["Medball Slam",1,10,30]]]),
  mk("2024-01-27b","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,8,null],["Landmine Side Drop",4,10,null],["Lat Pull Over",4,10,null]],["Core – 4 rds",["Plank",4,10,null],["Heel Taps",4,20,null]],["Arms – 4 rds",["Barbell Curl",4,12,20],["DB Reverse Fly",4,10,null],["Skull Crusher",4,10,50]]]),
  mk("2024-02-03","upper","Upper Body","upper",[["Pull – 4 rds",["DB Row",4,10,45,"incline TEMPO"],["KB Shoulder Shrug",4,10,45],["Pull Up",4,1,null,"30s"],["Cable Row",4,10,null]],["Arms – 4 rds",["Barbell Curl",4,10,20],["Cable Lat Pull Down",4,10,95],["Cable Tricep Extension",4,10,null]],["AMRAP",["Row Erg",1,1,null,"250m"],["Power Beast",1,10,null],["Medball Slam",1,10,30]]]),
  mk("2024-02-10b","upper","Upper Body","upper",[["Conditioning – 3 rds",["Sled Drag",3,1,null,"4pl"]],["Arms – 4 rds",["Concentration Curl",4,8,null],["DB Reverse Fly",4,10,40],["Bench Dip",4,10,15]],["Core – 4 rds",["Wood Chop",4,10,null],["Weighted Situp",4,10,15]],["AMRAP",["Ski Erg",1,15,null],["Power Beast",1,8,null],["Hammer Curl",1,8,30]]]),
  mk("2024-02-17b","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,8,50,"incline TEMPO"],["KB Shoulder Shrug",4,10,70],["Cable Face Pull",4,10,null]],["Arms – 4 rds",["Barbell Curl",4,10,30],["Lat Pull Over",4,6,100],["Banded Tricep Kickback",4,10,null]],["AMRAP",["Row Erg",1,1,null,"750m"],["Hammer Curl",1,10,30],["Butterfly Situp",1,10,null],["Renegade Row",1,8,null]]]),
  mk("2024-05-29","upper","Back Day","upper",[["Pull – 4 rds",["Barbell Row",4,10,null],["Lat Pull Over",4,10,null],["Cable Row",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,null],["Side Crunch",4,10,null]],["Arms – 4 rds",["Incline Curl",4,10,null],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["KB Curl",1,8,null],["Gorilla Row",1,16,null]]]),
  mk("2024-06-05","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,8,null],["Landmine Side Drop",4,10,null],["Lat Pull Over",4,10,null]],["Core – 4 rds",["Plank",4,10,null],["Heel Taps",4,20,null]],["Arms – 4 rds",["Hammer Curl",4,15,null],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]],["AMRAP",["Ski Erg",1,14,null],["Push Up",1,10,null]]]),
  mk("2024-06-12","upper","Back Day","upper",[["Pull – 4 rds",["Landmine Row",4,10,null],["Lat Pull Over",4,10,null],["Cable Row",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,25],["Side Crunch",4,10,null]],["Arms – 4 rds",["Incline Curl",4,10,null],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]]]),
  mk("2024-06-26","upper","Back Day","upper",[["Arms – 4 rds",["Barbell Curl",4,15,30],["Lat Pull Over",4,10,null],["Cable Tricep Extension",4,10,null]],["Core – 4 rds",["Plank",4,10,null],["Heel Taps",4,20,null]],["Pull – 4 rds",["Barbell Row",4,10,null],["Lateral Raise",4,8,22],["Cable Row",4,10,null]],["AMRAP",["Ski Erg",1,14,null],["Medball Slam",1,10,null],["DB Side Crunch",1,10,null]]]),
  mk("2024-07-10","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45],["Cable Row",4,10,null]],["Arms – 4 rds",["Hammer Curl",4,15,30],["Cable Lat Pull Down",4,10,null],["Cable Tricep Extension",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["Power Beast",1,10,null],["Medball Slam",1,12,null],["Butterfly Situp",1,15,null]]]),
  mk("2024-07-17","upper","Upper Body","upper",[["Conditioning – 4 rds",["Sled Drag",4,1,null,"4-5pl"],["Push Up",4,15,null]],["Arms – 4 rds",["Incline Curl",4,10,null],["DB Reverse Fly",4,10,null],["Bench Dip",4,10,15]],["Core – 4 rds",["Wood Chop",4,10,null],["Plate Halo",4,5,null]],["AMRAP",["Ski Erg",1,15,null],["Gorilla Row",1,10,null],["KB Curl",1,10,null]]]),
  mk("2024-07-24","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45],["Cable Row",4,10,null]],["Core – 4 rds",["Plank",4,10,null],["Heel Taps",4,20,null]],["Arms – 4 rds",["Hammer Curl",4,15,30],["DB Reverse Fly",4,10,45],["Cable Tricep Extension",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["Medball Slam",1,10,null],["KB Curl",1,10,null]]]),
  mk("2024-08-07","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,10,25],["Landmine Side Drop",4,10,null],["Lat Pull Over",4,10,null]],["Core – 4 rds",["Power Beast",4,10,null],["Plank",4,20,null]],["Arms – 4 rds",["Hammer Curl",4,8,null],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]],["AMRAP",["Ski Erg",1,20,null],["Renegade Row",1,8,null],["Plate Halo",1,10,null]]]),
  mk("2024-08-19","upper","Back Day","upper",[["Arms – 4 rds",["Barbell Curl",4,10,25],["Barbell Row",4,10,null],["Cable Tricep Extension",4,10,null]],["Core – 3 rds",["Cable Crunch",3,6,null],["Banded Glute Bridge",3,15,null]],["AMRAP",["Ski Erg",1,15,null],["Renegade Row",1,8,null],["Plate Halo",1,10,null]]]),
  mk("2024-08-26","upper","Back Day","upper",[["Conditioning – 4 rds",["Sled Drag",4,1,null,"4pl"],["Power Beast",4,10,null]],["Core",["Leg Lift",3,10,null],["DB Side Crunch",3,10,null]],["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45]],["Arms – 4 rds",["Barbell Curl",4,10,25],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]]]),
  mk("2024-09-02","upper","Back Day","upper",[["Arms – 4 rds",["Incline Curl",4,8,30],["Cable Tricep Extension",4,10,null],["DB Reverse Fly",4,8,30]],["Pull – 4 rds",["Barbell Row",4,10,null],["Lat Pull Over",4,10,null],["Cable Crunch",4,10,null]],["AMRAP",["Ski Erg",1,14,null],["Gorilla Row",1,10,null],["Ab Rollout",1,10,null]]]),
  mk("2024-09-09","upper","Back Day","upper",[["Pull – 4 rds",["Barbell Row",4,10,null],["Lat Pull Over",4,10,45],["Chin Up",4,10,null]],["Core – 4 rds",["Weighted Situp",4,10,null],["Leg Lift",4,10,null],["Russian Twist",4,20,null]],["Arms – 4 rds",["Concentration Curl",4,8,40],["DB Reverse Fly",4,10,35],["Cable Tricep Extension",4,10,65]],["AMRAP",["Row Erg",1,1,null,"300m"],["KB Curl",1,8,null],["Gorilla Row",1,16,null]]]),
  mk("2024-09-16","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45],["Cable Row",4,10,null]],["Arms – 4 rds",["Hammer Curl",4,15,30],["Cable Lat Pull Down",4,10,null],["Cable Tricep Extension",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["Power Beast",1,10,null],["Medball Slam",1,12,null]]]),
  mk("2024-09-23","upper","Back Day","upper",[["Arms – 4 rds",["Barbell Curl",4,8,25],["Cable Tricep Extension",4,10,null],["DB Reverse Fly",4,8,30]],["Pull – 4 rds",["Barbell Row",4,10,null],["Cable Lat Pull Down",4,10,null],["Chin Up",4,10,null]],["AMRAP",["Ski Erg",1,14,null],["Gorilla Row",1,10,null],["Ab Rollout",1,10,null]]]),
  mk("2024-10-07","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,10,null],["Landmine Side Drop",4,10,null],["Cable Lat Pull Down",4,10,null]],["Core – 4 rds",["Power Beast",4,10,null],["Plank",4,20,null]],["Arms – 4 rds",["Hammer Curl",4,8,null],["DB Reverse Fly",4,10,null],["Cable Tricep Extension",4,10,null]]]),
  mk("2024-10-21","upper","Back Day","upper",[["Arms – 4 rds",["Concentration Curl",4,8,35],["DB Reverse Fly",4,8,30],["Cable Tricep Extension",4,10,null]],["Core – 4 rds",["Banded Glute Bridge",4,10,null],["Dead Bug",4,20,null]],["Pull – 4 rds",["Barbell Row",4,10,null],["Cable Lat Pull Down",4,10,null],["Chin Up",4,10,null]]]),
  mk("2024-10-28","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,10,35],["Landmine Side Drop",4,10,35],["Lat Pull Over",4,10,null]],["Arms – 4 rds",["Hammer Curl",4,15,null],["Push Up",4,10,null],["Cable Tricep Extension",4,10,40]],["Core – 4 rds",["Plank",4,10,null],["Plank",4,5,null]]]),
  mk("2024-11-04","upper","Back Day","upper",[["Arms – 4 rds",["Barbell Curl",4,10,25],["Cable Tricep Extension",4,10,null],["DB Reverse Fly",4,8,30]],["Pull – 4 rds",["Barbell Row",4,10,null],["Cable Face Pull",4,10,null],["Pull Up",4,10,null]],["AMRAP",["Ski Erg",1,12,null],["Ab Rollout",1,10,null],["Row Erg",1,1,null,"200m"],["Gorilla Row",1,10,null]]]),
  mk("2024-11-11","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,10,45],["KB Shoulder Shrug",4,10,45],["Pull Up",4,1,null],["Cable Row",4,10,null]],["Arms – 4 rds",["Barbell Curl",4,10,20],["Cable Lat Pull Down",4,10,95],["Cable Tricep Extension",4,10,null]],["Core – 3 rds",["Banded Glute Bridge",3,10,null],["Russian Twist",3,20,null]]]),
  mk("2024-11-18","upper","Back Day","upper",[["Conditioning – 3 rds",["Sled Drag",3,1,null,"3pl"],["Barbell Row",3,10,null]],["Core",["Ab Rollout",3,10,null],["DB Side Crunch",3,10,null]],["Arms – 4 rds",["Barbell Curl",4,8,30],["DB Reverse Fly",4,10,40],["Cable Tricep Extension",4,10,40]]]),
  mk("2024-11-25","upper","Back Day","upper",[["Landmine – 4 rds",["Landmine Row",4,8,null],["Landmine Side Drop",4,10,null],["Lat Pull Over",4,10,null]],["Core – 4 rds",["Plank",4,10,null],["Heel Taps",4,20,null]],["Arms – 4 rds",["Barbell Curl",4,12,20],["DB Reverse Fly",4,10,null],["Skull Crusher",4,10,50]]]),
  mk("2024-12-02","upper","Back Day","upper",[["Pull – 4 rds",["DB Row",4,8,50],["KB Shoulder Shrug",4,10,45],["Cable Row",4,10,null]],["Arms – 4 rds",["Barbell Curl",4,15,25],["Lat Pull Over",4,6,100],["Banded Tricep Kickback",4,10,null]]]),
  mk("2024-12-09","upper","Back Day","upper",[["Arms – 4 rds",["Hammer Curl",4,8,30],["DB Reverse Fly",4,10,35],["Cable Tricep Extension",4,10,null]],["Pull – 4 rds",["DB Row",4,8,50],["Pull Up",4,10,null],["Cable Row",4,10,80]],["Core – 4 rds",["Plate Halo",4,10,25],["Side Crunch",4,8,null]]]),
  mk("2024-12-16b","upper","Back Day","upper",[["Conditioning – 4 rds",["Sled Drag",4,1,null,"3pl"],["Barbell Row",4,10,null]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]],["Arms – 4 rds",["Barbell Curl",4,8,30],["DB Reverse Fly",4,10,40],["Cable Tricep Extension",4,10,40]]]),
  // 2025 QUAD
  mk("2025-01-12","quad","Quads","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,205],["Barbell Back Squat",2,5,235],["Barbell Back Squat",1,8,165]],["Superset – 4 rds",["Bulgarian Split to Lunge",4,7,20],["Cable Crunch",4,10,null]],["Core – 4 rds",["V-Up",4,16,null],["Hollow Hold",4,1,null]],["Superset – 4 rds",["Leg Extension",4,10,100],["Box Step Up",4,10,25],["Calf Raise",4,12,null]]]),
  mk("2025-01-20","upper","Biceps/Back","upper",[["Legs – 4 rds",["Leg Extension",4,10,100],["Box Step Up",4,10,25],["Bent Knee Calf Raise",4,12,null]],["Upper – 4 rds",["DB Bicep Curl",4,12,35],["Cable Lat Pull Down",4,8,90],["Banded Tricep Kickback",4,10,null]],["Finisher",["Cable Row",1,10,null],["Pull Up",1,1,null]]]),
  mk("2025-01-26","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,225],["Barbell Back Squat",1,10,165]],["Core – 4 rds",["Hollow Hold",4,10,null],["Leg Lift",4,16,null]],["Superset – 4 rds",["Single Leg Extension",4,8,55],["Hack Squat",4,8,40],["Calf Raise",4,12,null]],["Conditioning – 4 rds",["Bike",4,1,null,"30s"],["Sandbag Walking Lunge",4,10,null]]]),
  mk("2025-02-16","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",1,6,185],["Barbell Back Squat",2,6,205],["Barbell Back Squat",1,10,165]],["Core – 3 rds",["Leg Lift",3,8,null],["Weighted Situp",3,10,null]],["Superset – 4 rds",["Single Leg Extension",4,8,55],["Box Step Over",4,10,null]],["Conditioning – 4 rds",["Bike",4,1,null],["Banded Glute Bridge",4,10,null],["Calf Raise",4,12,null]]]),
  mk("2025-02-24","quad","Legs","std",[["BB Back Squat (Volume)",["Barbell Back Squat",5,10,135]],["Superset – 4 rds",["Leg Extension",4,10,90],["BW Jump Squat",4,10,null]],["Trap Bar DL – 4 rds",["Trap Bar Deadlift",4,10,185]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Walking Lunge",4,20,null]]]),
  mk("2025-03-03","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,7,135],["Barbell Back Squat",1,7,185],["Barbell Back Squat",3,7,225]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,135],["Butterfly Situp",4,10,null],["Leg Lift",4,10,null]],["Superset – 4 rds",["Leg Extension",4,10,90],["Barbell Deficit RDL",4,8,185]],["Superset – 4 rds",["Leg Curl",4,10,90],["Incline Goblet Squat",4,10,45]]]),
  mk("2025-03-10","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,135],["Barbell Back Squat",2,7,185],["Barbell Back Squat",2,4,225]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,135],["Weighted Situp",4,10,null],["Side Crunch",4,10,null]],["Superset – 4 rds",["Leg Extension",4,10,100],["Barbell RDL",4,10,135]],["Superset – 4 rds",["Leg Curl",4,10,100],["Incline Goblet Squat",4,10,45]]]),
  mk("2025-03-17","quad","Legs","std",[["BB Back Squat (Volume)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",4,8,155]],["Core – 4 rds",["Ab Rollout",4,10,null],["Russian Twist",4,20,null]],["Conditioning – 3 rds",["Bike",3,12,null],["Leg Extension",3,6,115]],["Conditioning – 3 rds",["Ski Erg",3,12,null],["Leg Curl",3,6,115]],["Superset – 4 rds",["Walking Lunge",4,1,null],["Barbell RDL",4,8,135]]]),
  mk("2025-04-14","quad","Legs","std",[["BB Back Squat (Tempo 3ct)",["Barbell Back Squat",1,10,135],["Barbell Back Squat",4,8,175]],["Conditioning – 3 rds",["Sled Push/Drag",3,1,135],["Weighted Situp",3,10,null]],["Conditioning – 3 rds",["Ski Erg",3,12,null],["Leg Extension",3,6,115]],["Superset – 3 rds",["Box Step Up",3,8,null],["Leg Curl",3,6,115]]]),
  mk("2025-04-21","quad","Legs","std",[["BB Back Squat",["Barbell Back Squat",1,10,145],["Barbell Back Squat",4,8,185]],["Superset – 3 rds",["Sandbag Walking Lunge",3,1,null],["Weighted Situp",3,10,null]],["Conditioning – 3 rds",["Row Erg",3,1,null,"250m"],["Leg Extension",3,6,115],["Ski Erg",3,1,null],["Leg Curl",3,6,115]]]),
  mk("2025-04-28","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,6,185],["Barbell Back Squat",1,6,195]],["Conditioning – 3 rds",["Bike",3,12,null],["Leg Extension",3,7,115],["Weighted Situp",3,10,null]],["Superset – 3 rds",["Bulgarian Split Squat",3,8,20],["Barbell Deficit RDL",3,8,null]]]),
  mk("2025-05-05","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,6,185],["Barbell Back Squat",1,6,195]],["Superset – 4 rds",["Leg Extension",4,10,90],["Sumo Squat",4,10,null]],["Superset – 4 rds",["Leg Curl",4,10,90],["DB Single Leg RDL",4,8,45]]]),
  mk("2025-05-12","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,6,185],["Barbell Back Squat",1,6,195]],["Conditioning – 3 rds",["Bike",3,15,null],["Leg Extension",3,8,115],["Weighted Situp",3,10,null]],["Superset – 3 rds",["Sled Drag",3,1,225],["DB RDL",3,8,50]]]),
  mk("2025-05-19","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,8,185],["Barbell Back Squat",2,5,195]],["Conditioning – 4 rds",["Row Erg",4,1,null,"250m"],["Leg Extension",4,6,115],["Ski Erg",4,1,null],["Leg Curl",4,6,115]]]),
  mk("2025-05-27","quad","Legs","std",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",4,6,155]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,null],["Butterfly Situp",4,20,null],["Calf Raise",4,15,null]],["Superset – 4 rds",["Leg Extension",4,8,90],["DB Single Leg RDL",4,8,45]],["Superset – 4 rds",["Leg Curl",4,10,90],["B Stance Goblet Squat",4,8,null]]]),
  mk("2025-06-03","quad","Legs","std",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,155],["Barbell Back Squat",1,8,175],["Barbell Back Squat",1,8,185],["Barbell Back Squat",1,6,195],["Barbell Back Squat",1,6,205]],["Core",["Hollow Hold",3,10,null],["Banded Glute Bridge",3,10,null]],["Circuit – 5 rds",["Bike",5,15,null],["Leg Extension",5,10,115],["Barbell RDL",5,10,null]],["Superset – 3 rds",["Sled Drag",3,1,225],["GHD",3,10,null],["Calf Raise",3,15,null]]]),
  mk("2025-07-01","quad","Legs","std",[["BB Back Squat",["Barbell Back Squat",1,10,145],["Barbell Back Squat",4,8,185]],["Superset – 4 rds",["Sandbag Walking Lunge",4,1,null],["KB Calf Raise",4,15,null],["Weighted Situp",4,10,null]],["Circuit – 5 rds",["Bike",5,15,null],["BW Jump Squat",5,12,null],["Leg Curl",5,12,90]]]),
  mk("2025-07-15","quad","Legs","std",[["BB Back Squat (Tempo)",["Barbell Back Squat",1,10,145],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,195]],["Core",["Hollow Hold",3,10,null],["Banded Glute Bridge",3,10,null]],["Superset – 4 rds",["Sled Drag",4,1,270],["GHD",4,10,null],["Calf Raise",4,15,null]],["Circuit – 4 rds",["Bike",4,15,null],["Power Beast",4,10,null],["DB RDL",4,10,45]]]),
  mk("2025-09-14","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",2,6,185],["Barbell Back Squat",2,6,225],["Barbell Back Squat",1,10,165]],["Core – 3 rds",["Weighted Situp",3,10,null],["V-Up",3,16,null]],["Superset – 4 rds",["Single Leg Extension",4,8,55],["Incline Goblet Squat",4,10,null]],["Conditioning – 4 rds",["Sandbag Walking Lunge",4,1,null],["Calf Raise",4,12,null]]]),
  mk("2025-10-23","quad","Leg Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",2,5,185],["Barbell Back Squat",2,5,225],["Barbell Back Squat",1,10,165]],["Core – 3 rds",["Demon Crunch on Box",3,10,25],["DB Side Crunch",3,10,null]],["Superset – 4 rds",["Leg Extension",4,8,80],["Sumo Squat",4,10,null],["Wall Sit Hold",4,1,null]],["Superset – 4 rds",["Reverse Lunge",4,8,20],["Calf Raise",4,10,null]],["AMRAP",["Bike",1,15,null],["Barbell RDL",1,8,70],["Farmer Carry",1,2,null]]]),
  mk("2025-12-01","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",2,5,185],["Barbell Back Squat",2,5,225],["Barbell Back Squat",1,10,165]],["Core – 3 rds",["Demon Crunch on Box",3,10,25],["DB Side Crunch",3,10,null]],["Superset – 4 rds",["Leg Extension",4,8,80],["Sumo Squat",4,10,null],["Wall Sit Hold",4,1,null]],["Superset – 4 rds",["Reverse Lunge",4,8,20],["Calf Raise",4,10,null]]]),
  mk("2025-12-08","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",2,5,185],["Barbell Back Squat",2,5,225],["Barbell Back Squat",1,10,165]],["Superset – 4 rds",["Sled Drag",4,1,null,"6pl"],["Cable Crunch",4,16,null],["KB Calf Raise",4,15,null]],["AMRAP",["Bike",1,12,null],["BW Jump Squat",1,10,null],["Squat Step Back",1,10,null]]]),
  mk("2025-12-22","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,145],["Barbell Back Squat",2,5,195],["Barbell Back Squat",2,5,235],["Barbell Back Squat",1,10,175]],["Core – 4 rds",["Weighted Situp",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Leg Extension",4,10,105],["Incline Goblet Squat",4,10,65]],["Superset – 4 rds",["Leg Curl",4,10,110],["Box Step Over",4,20,25]]]),
  // 2025-26 GLUTE
  mk("2025-08-21","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,135],["Trap Bar Deadlift",2,8,225],["Trap Bar Deadlift",2,5,315]],["Superset – 4 rds",["Leg Curl",4,10,105],["Curtsy Lunge",4,8,25]],["Core – 3 rds",["Leg Lift",3,10,null],["Weighted Situp",3,10,null]],["AMRAP",["Bike",1,15,null],["KB Swing",1,10,null],["Beast to Plank",1,10,null]]]),
  mk("2025-08-28","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",2,8,225],["Trap Bar Deadlift",2,5,315]],["Core – 3 rds",["Demon Crunch on Box",3,10,35],["Plate Halo",3,10,null]],["Superset – 4 rds",["Leg Curl",4,8,105],["Sumo Squat",4,8,null]],["AMRAP",["KB Swing",1,1,null],["Reverse Lunge",1,8,null],["Barbell RDL",1,10,null]]]),
  mk("2025-09-18","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,135],["Trap Bar Deadlift",2,8,225],["Trap Bar Deadlift",2,5,315]],["Core",["Plank",1,1,null],["Heel Taps",1,20,null]],["Superset – 4 rds",["Leg Curl",4,10,105],["Curtsy Lunge",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["KB Swing",1,10,null]]]),
  mk("2025-09-25","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",2,8,225],["Trap Bar Deadlift",2,5,315]],["Core – 3 rds",["Demon Crunch on Box",3,10,35],["Plate Halo",3,10,null]],["Superset – 4 rds",["Leg Curl",4,8,105],["Sumo Squat",4,8,null]]]),
  mk("2025-10-09","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,135],["Trap Bar Deadlift",2,8,225],["Trap Bar Deadlift",2,5,315]],["Superset – 4 rds",["Leg Curl",4,10,105],["Curtsy Lunge",4,8,25]],["Core – 3 rds",["Leg Lift",3,10,null],["Weighted Situp",3,10,null]],["Bulgarians – 4 rds",["Bulgarian Split Squat",4,7,25],["Calf Raise",4,7,null]],["AMRAP",["Bike",1,15,null],["Barbell RDL",1,8,70],["Farmer Carry",1,2,null]]]),
  mk("2025-10-30","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,145],["Trap Bar Deadlift",2,8,235],["Trap Bar Deadlift",2,5,325]],["Core/Hinge",["Cable Crunch",1,10,80],["Barbell RDL",1,10,null]],["Superset – 4 rds",["Leg Curl",4,10,105],["Squat Step Back",4,10,null]],["AMRAP",["Row Erg",1,1,null,"300m"],["Sumo Squat",1,20,null],["Squat Step Back",1,10,null]]]),
  mk("2025-11-06","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,145],["Trap Bar Deadlift",2,8,235],["Trap Bar Deadlift",2,5,325]],["Superset – 4 rds",["Leg Curl",4,8,100],["Curtsy Lunge",4,10,null]],["Core – 3 rds",["Leg Lift",3,10,null],["Dead Bug",3,20,null]],["Superset – 4 rds",["Incline DB RDL",4,8,45],["Farmer Carry",4,2,null],["Single Leg Calf Raise",4,10,null]]]),
  mk("2025-11-13","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,145],["Trap Bar Deadlift",2,8,235],["Trap Bar Deadlift",2,5,325]],["Bulgarians – 4 rds",["Bulgarian Split Squat",4,7,25],["Calf Raise",4,7,null]],["Superset – 4 rds",["Leg Curl",4,10,null],["Farmer Carry",4,2,null]],["Core",["Leg Lift",3,10,null],["Weighted Situp",3,10,null]]]),
  mk("2025-11-20","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,145],["Trap Bar Deadlift",2,8,235],["Trap Bar Deadlift",2,5,325]],["Superset – 4 rds",["Leg Curl",4,8,100],["Sumo Squat",4,10,null]],["Core – 4 rds",["Leg Lift",4,10,null],["Hollow Hold",4,10,null]],["Superset – 4 rds",["Single Leg RDL with Knee Drive",4,8,30],["Copenhagen",4,10,null],["Calf Raise",4,12,null]]]),
  mk("2025-12-04","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,165],["Trap Bar Deadlift",2,8,245],["Trap Bar Deadlift",2,5,335]],["Superset – 4 rds",["Single Leg Curl",4,8,60],["Goblet Squat",4,8,60]],["Core",["V-Up",3,10,14],["Side Plank Hip Dip",3,10,null]],["Superset – 4 rds",["Reverse Lunge",4,10,30],["KB Calf Raise",4,10,null]]]),
  mk("2025-12-11","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,165],["Trap Bar Deadlift",2,8,245],["Trap Bar Deadlift",2,5,335]],["Banded Circuit – 4 rds",["Banded Scooter Hamstring Curls",4,10,null],["Banded Glute Bridge",4,20,null],["Heel Taps",4,20,null]],["Accessories",["Hack Squat",3,8,35],["Copenhagen",3,10,null],["Cable Crunch",3,16,null]],["AMRAP",["Bike",1,1,null],["Sumo Squat",1,10,null],["Squat Step Back",1,20,null]]]),
  mk("2025-12-18","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,165],["Trap Bar Deadlift",2,8,255],["Trap Bar Deadlift",2,5,345]],["Superset – 4 rds",["Leg Curl",4,10,110],["Landmine Single Leg Hip Thrust",4,10,25]],["Landmine Core – 4 rds",["Landmine Side Drop",4,10,null],["Plank",4,8,null]],["Landmine – 4 rds",["Incline Goblet Squat",4,10,25],["Landmine RDL",4,8,25]]]),
  mk("2026-01-08","glute","Glutes","glute",[["Trap Bar DL",["Trap Bar Deadlift",1,10,165],["Trap Bar Deadlift",4,5,245]],["Superset – 4 rds",["Single Leg Curl",4,8,60],["Bent Knee Calf Raise",4,15,null]],["Core",["Weighted Situp",3,10,null],["Plate Halo",3,8,null],["Plank",3,1,null]],["Superset – 4 rds",["Single Leg Bench Hip Thrust",4,10,40],["Barbell RDL",4,8,135]]]),
  mk("2026-01-13","upper","Back","upper",[["Pull – 4 rds",["Barbell Row",4,8,55],["Cable Lat Pull Down",4,10,90],["Chin Up",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,null],["Side Crunch",4,10,null]],["Arms – 4 rds",["Concentration Curl",4,8,33],["DB Reverse Fly",4,8,40],["Cable Tricep Extension",4,10,45]],["Finisher",["Row Erg",1,1,null,"300m"],["Renegade Row",1,10,35],["Heel Taps",1,10,null]]]),
  mk("2026-01-22","glute","Glutes","glute",[["Trap Bar DL",["Trap Bar Deadlift",4,8,145]],["Superset – 4 rds",["Leg Curl",4,8,115],["Sumo Squat",4,10,null]],["Conditioning – 4 rds",["Row Erg",4,1,null,"250m"],["Single Leg RDL with Knee Drive",4,8,null]],["Core",["Dead Bug",3,20,15],["Heel Taps",3,20,null]]]),
  mk("2026-01-29","glute","Glutes","glute",[["Trap Bar DL (Ramping)",["Trap Bar Deadlift",1,10,145],["Trap Bar Deadlift",3,8,235]],["Bulgarians – 4 rds",["Bulgarian Split Squat",4,7,30],["Calf Raise",4,7,null]],["Superset – 4 rds",["Leg Curl",4,10,105],["Farmer Carry",4,2,null]],["AMRAP",["Bike",1,1,null],["Weighted Situp",1,10,20],["Russian Twist",1,20,null]]]),
  mk("2026-02-16","quad","Quad Day","quad",[["BB Back Squat (Ramping)",["Barbell Back Squat",1,8,135],["Barbell Back Squat",1,6,185],["Barbell Back Squat",2,6,205],["Barbell Back Squat",1,10,165]],["Core – 3 rds",["Hip Flexor",3,8,null],["Box Crunch",3,10,null]],["Superset – 4 rds",["Single Leg Extension",4,8,55],["Box Step Over",4,10,null]],["Conditioning – 4 rds",["Bike",4,1,null,".7 mi"],["Banded Abductor",4,10,null],["Calf Raise",4,12,null]]]),
  mk("2026-02-24","quad","Quad Day","quad",[["BB Back Squat (Volume)",["Barbell Back Squat",5,10,135]],["Superset – 4 rds",["Leg Extension",4,10,90],["BW Jump Squat",4,10,null]],["Trap Bar DL",["Trap Bar Deadlift",4,10,185]],["Superset – 4 rds",["Hamstring Curl",4,10,90],["Front Lunge",4,20,null]]]),
];

const SEED_RACHEL=[
  mk("2025-01-13","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,5,95],["Back Squat",1,5,105],["Back Squat",1,5,110],["Back Squat",1,5,115],["Back Squat",1,5,125]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,185],["DB Walking Lunge",4,10,30,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,15,25,"each"],["Leg Extension",4,15,null,"3s hold"]],["Finisher – 3 rds",["DB Step Up",3,7,20,"each"],["BW Jump Squat",3,20,null]]]),
  mk("2025-01-20","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,7,95],["Back Squat",1,7,105],["Back Squat",1,7,110],["Back Squat",1,7,115],["Back Squat",1,7,120]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,205],["DB Walking Lunge",4,10,35,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,8,35,"each"],["Leg Extension",4,10,null]],["Finisher – 3 rds",["DB Step Up",3,7,25,"each"],["BW Jump Squat",3,20,null]]]),
  mk("2025-01-27","quad","Leg Day","rleg",[["Back Squat – 5 rds",["Back Squat",5,10,105]],["Superset – 5 rds",["Goblet Squat",5,8,50],["Leg Extension",5,12,null]],["Superset – 4 rds",["Box Step Up",4,8,25,"each"],["Bulgarian Split Squat",4,20,null,"each"]]]),
  mk("2025-02-03","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,5,95],["Back Squat",1,5,105],["Back Squat",1,5,110],["Back Squat",1,5,115],["Back Squat",1,5,125]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,185],["DB Walking Lunge",4,10,30,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,12,25],["Leg Extension",4,12,null]]]),
  mk("2025-02-17","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,10,95],["Back Squat",2,8,115],["Back Squat",1,5,125],["Back Squat",1,5,135]],["Superset – 4 rds",["Sumo Squat",4,10,50],["Leg Extension",4,10,null]],["Superset – 4 rds",["Bench Step Down",4,8,25,"each"],["Curtsy Lunge",4,8,20]],["Finisher – 4 rds",["Wall Sit Hold",4,30,null,"sec"]]]),
  mk("2025-02-24","quad","Leg Day","rleg",[["Back Squat",["Back Squat",1,10,75],["Back Squat",4,10,95]],["Superset – 4 rds",["Leg Extension",4,10,null],["BW Jump Squat",4,10,null]],["Superset – 4 rds",["Trap Bar Deadlift",4,10,95],["Banded Adductor",4,15,null]],["Superset – 4 rds",["Hamstring Curl",4,10,null],["Jump Lunge",4,20,null]],["Abs – 3 rds",["Weighted Deadbug",3,20,null],["Russian Twist",3,20,null]]]),
  mk("2025-03-03","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,10,95],["Back Squat",1,10,110],["Back Squat",1,8,120],["Back Squat",1,5,140]],["Core – 4 rds",["Weighted Situp",4,10,null],["Leg Lift",4,10,null]],["Superset – 4 rds",["Sled Push/Drag",4,1,null,"2 plates"],["BW Sumo Squat",4,10,null]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,175],["BW Walking Lunge",4,1,null,"DnB"]],["Superset – 4 rds",["Barbell Deficit RDL",4,8,75],["Farmer Carry",4,2,null,"DnB"]]]),
  mk("2025-03-17","quad","Leg Day","rleg",[["Back Squat – 5 rds",["Back Squat",5,10,115]],["Core – 4 rds",["Ab Rollout",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Goblet Squat",4,10,50],["Leg Extension",4,12,null]],["Superset – 4 rds",["Box Step Up",4,8,25,"each"],["Banded Scooter Hamstring Curls",4,10,null]],["Conditioning – 4 rds",["Row Erg",4,1,null,"200m"],["Walking Lunge",4,10,null]]]),
  mk("2025-03-24","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,8,95],["Back Squat",1,8,110],["Back Squat",1,5,120],["Back Squat",1,5,140],["Back Squat",1,3,160]],["Core – 4 rds",["Weighted Situp",4,10,null],["Leg Lift",4,10,null]],["Superset – 4 rds",["Sled Push/Drag",4,1,null,"2 plates"],["BW Sumo Squat",4,8,null]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,155],["BW Walking Lunge",4,1,null,"DnB"]]]),
  mk("2025-04-07","lower","Leg Day","rleg",[["Back Squat",["Back Squat",1,8,115],["Back Squat",4,8,135]],["Abs – 3 rds",["Weighted Deadbug Crunch",3,10,null],["Banded Glute Bridge March",3,16,null]],["Superset – 4 rds",["Leg Extension",4,10,null,"2s pause"],["KB Sumo Squat Pulse",4,20,null]],["Superset – 4 rds",["Hamstring Curl",4,10,null,"2s pause"],["Lunge Pulse",4,15,null,"each"]],["Superset – 4 rds",["KB Suitcase Deadlift",4,10,null],["GHD",4,10,null]]]),
  mk("2025-04-14","lower","Leg Day","rleg",[["Back Squat – 5 rds",["Back Squat",5,5,115,"3ct descent"]],["Core – 4 rds",["Ab Rollout",4,10,null],["Russian Twist",4,20,null]],["Superset – 4 rds",["Goblet Squat",4,10,50],["Leg Extension",4,10,null]],["Superset – 4 rds",["Sumo Squat",4,10,null],["Leg Curl",4,10,null]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,null],["Single Leg DB RDL",4,8,null,"each"]]]),
  mk("2025-04-21","lower","Leg Day","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,95],["Barbell Sumo Deadlift",2,5,115],["Barbell Sumo Deadlift",2,5,135]],["Superset – 4 rds",["Leg Extension",4,8,null],["Barbell RDL",4,8,95]],["Core",["Plate Crunch",1,10,null],["Heel Taps",1,20,null]],["Superset – 4 rds",["Leg Curl",4,10,null],["KB Calf Raise",4,10,null]],["Superset – 4 rds",["Barbell Walking Lunge",4,10,null,"DnB"],["GHD",4,10,null]]]),
  mk("2025-04-28","lower","Leg Day","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,95],["Barbell Sumo Deadlift",2,8,115],["Barbell Sumo Deadlift",1,8,135]],["Core",["Ab Rollout",1,10,null]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,185],["DB Walking Lunge",4,10,30,"each"]],["Superset – 4 rds",["Leg Extension",4,8,null],["Goblet Squat",4,8,null],["Ab Rollout",4,10,null]],["Superset – 4 rds",["Bulgarian Split Squat",4,8,25,"each"],["KB Calf Raise",4,10,null],["DB Side Crunch",4,10,null,"each"]]]),
  mk("2025-05-05","lower","Leg Day","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,105],["Barbell Sumo Deadlift",2,8,115],["Barbell Sumo Deadlift",1,8,135]],["Abs – 3 rds",["Weighted Situp",3,10,null],["Flutter Kick",3,30,null]],["Superset – 4 rds",["Leg Extension",4,10,null,"2s pause"],["Goblet Squat",4,10,null]],["Superset – 4 rds",["Hamstring Curl",4,10,null,"2s pause"],["Trap Bar Deadlift",4,10,25]],["Superset – 4 rds",["Bulgarian Split Squat",4,8,20],["Banded Adductor",4,15,null]]]),
  mk("2025-05-12","lower","Leg Day","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,115],["Barbell Sumo Deadlift",2,8,125],["Barbell Sumo Deadlift",1,8,145]],["Glute Activation – 3 rds",["Banded Hip Thrust",3,10,null],["Hip Thrust Hold Adductors",3,10,null]],["Superset – 4 rds",["Leg Extension",4,10,null,"2s pause"],["Incline Goblet Squat",4,10,null]],["Superset – 4 rds",["Hamstring Curl",4,10,null,"2s pause"],["SL RDL",4,8,35,"each"]],["Superset – 4 rds",["Bulgarian Split Squat",4,8,20],["Bulgarian Split Squat",4,8,null],["Calf Raise",4,10,null]]]),
  mk("2025-05-19","lower","Leg Day","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,95],["Barbell Sumo Deadlift",2,5,115],["Barbell Sumo Deadlift",2,5,135]],["Core – 4 rds",["Ab Rollout",4,10,null],["DB Side Crunch",4,10,null,"each"]],["Superset – 4 rds",["Leg Extension",4,10,null],["Squat Hold Step Back",4,10,null]],["Superset – 4 rds",["Leg Curl",4,10,null],["Incline DB RDL",4,8,30,"2s pause"]],["Superset – 4 rds",["GHD",4,8,null],["Goblet Squat",4,8,45]]]),
  mk("2025-06-02","quad","Leg Day","rleg",[["Back Squat (Ramping)",["Back Squat",1,8,95],["Back Squat",1,8,115],["Back Squat",1,8,125],["Back Squat",1,8,135],["Back Squat",1,8,145]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,205],["DB Walking Lunge",4,10,35,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,8,35,"each"],["Leg Extension",4,8,null]],["Finisher – 3 rds",["KB Sumo Squat",3,10,null],["BW Jump Squat",3,20,null]]]),
  mk("2025-06-16","lower","Lower Body","rleg",[["Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,125],["Barbell Sumo Deadlift",1,8,135],["Barbell Sumo Deadlift",1,5,145],["Barbell Sumo Deadlift",1,5,150],["Barbell Sumo Deadlift",1,3,155]],["Core – 4 rds",["Landmine Side Drop",4,10,10],["Deadbug Crunch",4,10,null]],["Superset – 4 rds",["Leg Extension",4,10,null],["Landmine Hack Squat",4,10,50]],["Superset – 4 rds",["Leg Curl",4,10,null],["Single Leg Landmine RDL",4,8,25,"each"]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"5 plates"],["Calf Raise",4,15,null]]]),
  mk("2025-06-23","lower","Lower Body","rleg",[["Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,125],["Barbell Sumo Deadlift",1,8,135],["Barbell Sumo Deadlift",1,6,145],["Barbell Sumo Deadlift",1,6,150],["Barbell Sumo Deadlift",1,4,155]],["Core – 4 rds",["Wood Chop",4,8,20,"each"],["Cable Crunch",4,10,null]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,null,"4 plates DnB"],["Calf Raise",4,10,null]],["Superset – 4 rds",["Leg Extension",4,10,null],["Incline DB RDL",4,10,35]]]),
  mk("2025-06-30","lower","Lower Body","rleg",[["Barbell Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,115],["Barbell Sumo Deadlift",2,8,125],["Barbell Sumo Deadlift",2,8,145]],["Core – 4 rds",["Banded Glute Bridge",4,10,30],["Banded Glute Bridge Abductor Pulse",4,10,null]],["Superset – 4 rds",["Leg Extension",4,10,null],["Incline Goblet Squat",4,10,50]],["Superset – 4 rds",["Hamstring Curl",4,10,null],["Incline DB RDL",4,10,35]],["Superset – 3 rds",["Bulgarian Split Squat",3,8,20],["Bulgarian Split Pulse BW",3,10,null],["Calf Raise",3,10,null]]]),
  mk("2025-07-14","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,125],["Sumo Squat",1,8,135],["Sumo Squat",1,5,145],["Sumo Squat",1,5,155],["Sumo Squat",1,5,165]],["Superset – 4 rds",["Bench Step Down",4,8,null,"each"],["Calf Raise",4,20,null],["Incline DB RDL",4,10,35]],["Core",["Plate Leg Raise to Situp",1,10,15],["Plate Reverse Crunch",1,10,15],["Kneeling Plate Hip Halo",1,10,15]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"4 plates DnB"],["GHD",4,10,null]]]),
  mk("2025-07-21","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,125],["Sumo Squat",1,8,135],["Sumo Squat",1,5,145],["Sumo Squat",1,5,155],["Sumo Squat",1,5,165]],["Superset – 4 rds",["Barbell Hip Thrust",4,10,185],["DB Walking Lunge",4,10,30,"each"]],["Core",["Plate Reverse Crunch to Leg Raise",1,10,15],["KB Kneeling Hip Circle",1,10,null,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,12,25,"each"],["Leg Extension",4,12,null]]]),
  mk("2025-07-28","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,125],["Sumo Squat",1,8,135],["Sumo Squat",3,5,150]],["Superset – 4 rds",["DB Walking Lunge",4,10,40,"progressive, each"]],["Core",["Plate Crunch to Leg Raise",1,10,15],["DB Side Crunch",1,10,null,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,7,25],["Bulgarian Split Squat",4,7,null],["Bulgarian Split Squat",4,7,null]]]),
  mk("2025-08-04","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,125],["Sumo Squat",1,8,135],["Sumo Squat",3,5,150]],["Superset – 4 rds",["Leg Extension",4,10,null,"2s pause"],["Goblet Squat",4,10,35]],["Superset – 4 rds",["Hamstring Curl",4,10,null,"2s pause"],["Reverse Lunge",4,10,25]],["Core – 4 rds",["Weighted Situp",4,10,null],["Russian Twist",4,20,null]],["Conditioning",["Sled Drag",1,1,null,"4 plates DnB"],["GHD",1,10,null]]]),
  mk("2025-08-18","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,135],["Sumo Squat",2,6,155],["Sumo Squat",2,6,165]],["Superset – 4 rds",["Goblet Squat",4,10,50],["Leg Extension",4,10,null]],["Superset – 4 rds",["Bulgarian Split Squat",4,7,30,"each"],["Bulgarian Split Squat",4,7,null],["Bulgarian Split Squat",4,7,null]]]),
  mk("2025-08-25","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,135],["Sumo Squat",2,6,155],["Sumo Squat",1,3,175],["Sumo Squat",1,3,195]],["Core – 3 rds",["V-Up",3,10,15],["Flutter Kick",3,30,null]],["Superset – 4 rds",["Leg Extension",4,10,null],["Sandbag Walking Lunge",4,10,null,"DnB"]],["Superset – 4 rds",["BW Bench Step Down",4,8,null,"each"],["KB Calf Raise",4,10,null],["Plank to Beast",4,10,null]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"5 plates DnB"]]]),
  mk("2025-09-08","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,135],["Sumo Squat",1,6,155],["Sumo Squat",1,6,175],["Sumo Squat",1,3,195],["Sumo Squat",1,1,205]],["Superset – 4 rds",["DB Walking Lunge",4,10,40,"progressive, each"]],["Core",["Plate Crunch",1,10,15],["Leg Lift",1,10,15]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,8,25,"each"],["Bulgarian Split Squat",4,8,null,"each"],["KB Calf Raise",4,10,null]]]),
  mk("2025-09-14","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,135],["Sumo Squat",1,6,155],["Sumo Squat",1,6,175],["Sumo Squat",1,3,195],["Sumo Squat",1,1,205]],["Superset – 4 rds",["Leg Extension",4,10,null,"2s pause"],["Incline Goblet Squat",4,10,null]],["Superset – 4 rds",["Hamstring Curl",4,10,null,"2s pause"],["Curtsy Lunge",4,8,25,"each"]],["Conditioning – 4 rds",["Bike",4,1,null,"1 min legs only"],["Farmer Carry",4,2,null,"DnB"],["Calf Raise",4,10,null]]]),
  mk("2025-09-22","lower","Lower Body","rleg",[["Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,135],["Barbell Sumo Deadlift",1,6,155],["Barbell Sumo Deadlift",1,6,175],["Barbell Sumo Deadlift",1,3,195],["Barbell Sumo Deadlift",1,1,205]],["Core – 3 rds",["Plate Crunch",3,10,null],["V-Up",3,16,null]],["Superset – 4 rds",["Single Leg Extension",4,8,null,"each"],["B Stance Goblet Squat",4,8,null,"each"]],["Conditioning – 4 rds",["Sandbag Walking Lunge",4,1,null,"DnB"],["Plate Calf Raise",4,12,null]],["Bike EMOM",["Bike",1,1,null,"8-10 min"],["Farmer Carry",1,2,null,"DnB"]]]),
  mk("2025-09-29","lower","Lower Body","rleg",[["Sumo Deadlift (Ramping)",["Barbell Sumo Deadlift",1,8,135],["Barbell Sumo Deadlift",1,6,155],["Barbell Sumo Deadlift",1,6,175],["Barbell Sumo Deadlift",1,3,195],["Barbell Sumo Deadlift",1,1,205]],["Superset – 4 rds",["Leg Extension",4,8,null],["Incline Goblet Squat",4,10,50],["Cable Crunch Hold",4,10,null]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"4 plates"],["Sumo Squat Plie",4,10,null]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,7,15,"each"]]]),
  mk("2025-10-06","lower","Lower Body","rleg",[["Sumo Squat (Ramping)",["Sumo Squat",1,8,135],["Sumo Squat",2,6,155],["Sumo Squat",1,3,175],["Sumo Squat",1,3,195]],["Core – 3 rds",["V-Up",3,10,15],["Flutter Kick",3,30,null]],["Superset – 4 rds",["Leg Extension",4,10,null],["Sandbag Walking Lunge",4,10,null,"DnB"]],["Superset – 4 rds",["DB Bench Step Down",4,8,null,"each"],["KB Calf Raise",4,10,null],["Plank to Beast",4,10,null]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"5 plates"]]]),
  mk("2025-10-13","lower","Lower Body","rleg",[["Trap Bar Deadlift (Ramping)",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",2,6,155],["Trap Bar Deadlift",1,3,175],["Trap Bar Deadlift",1,3,195]],["Core – 3 rds",["Demon Crunch on Box",3,10,25],["DB Side Crunch",3,10,null,"each"]],["Superset – 4 rds",["Leg Extension",4,8,null,"tempo"],["Sumo Squat 1.5s",4,10,null],["Wall Sit Hold",4,30,null,"sec"]],["Superset – 4 rds",["Reverse + Curtsy Lunge",4,8,20,"each"],["KB Elevated Calf Raise",4,10,null],["Adductor Plate Slide",4,20,10]]]),
  mk("2025-10-20","lower","Lower Body","rleg",[["Trap Bar Deadlift (Ramping)",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",2,6,155],["Trap Bar Deadlift",1,3,175],["Trap Bar Deadlift",1,3,195]],["Core – 3 rds",["Plate Crunch",3,10,null],["Leg Lift",3,10,null]],["Superset – 4 rds",["Leg Extension",4,8,null,"tempo"],["Sumo Squat",4,8,null],["Wall Sit Hold",4,30,null,"sec"]],["Superset – 4 rds",["Curtsy Lunge",4,10,25],["KB Elevated Calf Raise",4,10,null],["Copenhagen",4,10,null,"each"]]]),
  mk("2025-10-27","lower","Lower Body","rleg",[["Trap Bar Deadlift (Ramping)",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",1,8,155],["Trap Bar Deadlift",1,5,175],["Trap Bar Deadlift",1,5,195],["Trap Bar Deadlift",1,3,200]],["Core – 4 rds",["Landmine Side Drop",4,10,10],["Knee Tuck on Box",4,10,null]],["Superset – 4 rds",["Single Leg Extension",4,8,null],["Landmine Hack Squat",4,10,45]],["Superset – 4 rds",["Leg Curl",4,8,null],["Single Leg Landmine RDL",4,8,35,"each"]],["Conditioning – 4 rds",["Sled Drag",4,1,null,"5 plates DnB"],["Calf Raise",4,10,null],["Copenhagen",4,10,null]]]),
  mk("2025-11-03","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,225],["Hip Thruster",1,8,255],["Hip Thruster",1,6,290],["Hip Thruster",1,6,310],["Hip Thruster",1,6,320]],["Superset – 4 rds",["Leg Curl",4,8,null],["DB Squat to Curtsy Lunge",4,10,25]],["Core – 3 rds",["Leg Lift",3,10,null],["Dead Bug",3,20,null]],["Superset – 4 rds",["Incline DB RDL",4,8,40],["Farmer Carry",4,2,null,"DnB"],["Single Leg Calf Raise",4,10,null]]]),
  mk("2025-11-17","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,225],["Hip Thruster",2,5,255],["Hip Thruster",2,5,290],["Hip Thruster",1,3,310]],["Superset – 4 rds",["Leg Curl",4,8,null,"pause"],["Sumo Squat 1.5s",4,10,null]],["Core – 4 rds",["Demon Crunch on Box",4,8,25],["Russian Twist",4,20,25]],["Superset – 4 rds",["Single Leg RDL with Knee Drive",4,8,30,"each"],["Copenhagen on Box",4,10,null,"each"],["Calf Raise",4,12,null]]]),
  mk("2025-12-01","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,225],["Hip Thruster",2,6,255],["Hip Thruster",2,6,290],["Hip Thruster",1,5,310]],["Superset – 4 rds",["Single Leg Curl",4,8,null,"tempo"],["Sumo Squat",4,10,null],["Wall Sit Hold",4,30,null,"sec"]],["Core",["Weighted V-Up",1,10,null],["Side Plank Hip Dip",1,10,null,"each"]],["Superset – 4 rds",["Curtsy Lunge",4,10,25],["KB Elevated Calf Raise",4,10,null]]]),
  mk("2025-12-08","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",1,5,290],["Hip Thruster",1,5,315],["Hip Thruster",1,5,345],["Hip Thruster",1,3,365]],["Accessory – 4 rds",["Banded Scooter Hamstring Curls",4,10,null],["Banded Glute Bridge March",4,20,null],["Banded Glute Bridge + Pulse",4,20,null],["Heel Taps",4,20,null]],["Finisher",["Banded Sissy Squat",1,10,null],["Single Leg Calf Raise",1,10,null],["Cable Crunch",1,16,null]],["Bike EMOM – 8 min",["Bike",1,1,null],["Bike Both",1,1,null]]]),
  mk("2025-12-15","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",1,5,290],["Hip Thruster",1,5,315],["Hip Thruster",1,5,345],["Hip Thruster",1,3,365]],["Superset – 4 rds",["Leg Curl",4,8,null,"pause"],["Sumo Squat 1.5s",4,8,null],["Calf Raise",4,10,20,"each"]],["Core – 4 rds",["Knee Tuck on Box",4,10,null],["DB Side Crunch",4,10,null],["KB Kneeling Hip Circle",4,10,null]],["Superset – 4 rds",["Single Leg RDL with Knee Drive",4,8,30,"each"],["Copenhagen",4,10,null,"each"]]]),
  mk("2025-12-22","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",1,8,290],["Hip Thruster",1,5,315],["Hip Thruster",1,5,345],["Hip Thruster",1,3,365]],["Core",["Box Crunch",1,10,null],["Box V-Up",1,10,null],["Russian Twist",1,20,20]],["Superset – 4 rds",["Leg Curl",4,10,null],["Goblet Squat",4,8,45,"each"]],["Superset – 4 rds",["DB Bulgarian Split Squat",4,10,25],["Bulgarian Split Squat",4,10,null],["Calf Raise",4,10,null]]]),
  mk("2025-12-29","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",1,8,295],["Hip Thruster",1,5,315],["Hip Thruster",1,5,345],["Hip Thruster",1,3,365]],["Core",["Band Hold Leg Lift",1,10,null],["Flutter Kick",1,20,null]],["Superset – 4 rds",["Leg Curl",4,10,null],["Ballerina Bulgarian",4,8,25,"each"],["Side Lying Abductor",4,10,null]],["AMRAP – 4 rds",["Bike",4,10,null,"cal"],["BW Jump Squat",4,10,null],["SL RDL",4,8,35,"each"],["Calf Raise",4,10,null]]]),
  mk("2026-01-05","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",4,8,295]],["Superset – 4 rds",["Single Leg Curl",4,8,45,"tempo"],["Incline Goblet Squat",4,10,null],["Wall Sit Hold",4,30,null,"sec"]],["Core",["Weighted V-Up",1,10,null],["Banded Clamshell",1,10,null,"each"]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,null,"5 plates"],["KB Elevated Calf Raise",4,10,null]]]),
  mk("2026-01-12","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",4,8,295]],["Superset – 4 rds",["Bulgarian into Lunge into Calf Raise",4,7,20,"each"]],["Core",["Wall Ball Ab Pass",1,10,null],["Beast Wallball Side Rotation",1,8,null,"each"],["Plank",1,20,null,"sec"]],["Superset – 4 rds",["Leg Curl",4,8,null],["Incline DB RDL",4,8,35]]]),
  mk("2026-01-19","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",1,5,290],["Hip Thruster",1,5,315],["Hip Thruster",1,5,345],["Hip Thruster",1,3,365]],["Conditioning – 4 rds",["Bike",4,10,null,"cal"],["Sled Push/Drag",4,1,null,"5 plates"]],["Accessory – 4 rds",["Banded Scooter Hamstring Curls",4,10,null],["Banded Glute Bridge March",4,20,null],["Banded Glute Bridge + Pulse",4,15,null]],["Finisher",["GHD",1,10,null],["Calf Raise",1,10,null],["Squat Hold Step Back",1,20,null]]]),
  mk("2026-01-26","glute","Glutes","rglute",[["Superset – 4 rds",["Back Squat",4,7,65],["Leg Curl",4,10,null],["Calf Raise",4,10,null]],["Core – 4 rds",["Band Hold Leg Lift",4,10,null],["Hollow Hold",4,20,null,"sec"]],["AMRAP",["Bike",1,1,null,"1 min"],["Sandbag Walking Lunge",1,10,null,"DnB"],["SL RDL",1,8,45,"each"]]]),
  mk("2026-02-02","glute","Glutes","rglute",[["Hip Thruster (Ramping)",["Hip Thruster",1,8,255],["Hip Thruster",4,5,295]],["Superset – 4 rds",["Single Leg Curl",4,8,45,"tempo"],["Incline Goblet Squat",4,10,null],["Wall Sit Hold",4,30,null,"sec"]],["Core",["Weighted V-Up",1,10,null],["Clamshells",1,10,null,"each"]],["Conditioning – 4 rds",["Sled Push/Drag",4,1,null,"5 plates"],["Calf Raise",4,10,null]]]),
  mk("2026-02-09","glute","Glutes","rglute",[["Back Squat",["Back Squat",1,7,75],["Back Squat",2,7,85],["Back Squat",2,7,95]],["Superset – 4 rds",["Leg Curl",4,8,null,"pause"],["Cossack Squat",4,10,null]],["Core – 4 rds",["Demon Crunch on Box",4,8,25],["Russian Twist",4,20,25],["Copenhagen",4,10,null]],["Superset – 4 rds",["Single Leg RDL with Knee Drive",4,8,30,"each"],["Calf Raise",4,12,null]]]),
  mk("2026-02-16","glute","Glutes","rglute",[["Back Squat",["Back Squat",1,7,75],["Back Squat",2,7,95],["Back Squat",2,5,105]],["Core – 3 rds",["Plate Crunch",3,10,10],["Side Plank Hip Dip",3,6,null,"each"]],["Superset – 4 rds",["Leg Curl",4,10,15],["Box Step Over",4,10,null],["Hip Flexor",4,8,null,"each"]],["Superset – 4 rds",["Barbell RDL",4,8,75],["Banded Abductor",4,10,null,"each"]]]),
];

const SEED_ANGELA=[
mk("2025-01-13","quad","Squat Percentage Work","abike",[["Pre-exhaust",["Leg Curl",4,15,null,"2-45 plates"],["Leg Extension",4,15,null,"2-45 plates"]],["Squat",["Barbell Back Squat",1,12,88],["Barbell Back Squat",5,12,110,"80%"]],["Accessories",["DB Walking Lunge",4,20,20,"10 down/10 back"],["Hip Thruster",4,10,165]]]),
mk("2025-01-20","quad","Squat Strength Day","abike",[["Warmup SS",["DB Single Leg RDL",3,12,25],["Leg Extension",3,15,null,"2-45 plates"]],["Squat",["Barbell Back Squat",1,8,101],["Barbell Back Squat",2,5,115],["Barbell Back Squat",3,3,128]],["Accessories",["DB Walking Lunge",4,20,20],["Hip Thruster",4,10,165]]]),
mk("2025-02-03","quad","Squat Volume","abike",[["Squat",["Barbell Back Squat",1,12,95,"70%"],["Barbell Back Squat",5,5,115,"85%"]],["Accessories",["DB RDL",4,12,null],["Leg Extension",4,12,null,"2-45/5"],["Leg Curl",4,15,null,"2-45 plates"]],["Finisher",["DB Walking Lunge",4,20,20],["Hip Thruster",4,10,null]]]),
mk("2025-02-10","quad","Squat Intensity","abike",[["Pre-exhaust",["Leg Curl",4,12,null,"2-45 plates"],["Leg Extension",4,15,null,"2-45 plates"]],["Squat",["Barbell Back Squat",5,5,115,"85%"]],["Accessories",["DB Walking Lunge",4,20,20],["Hip Thruster",4,10,null]],["Finisher",["Wall Sit Hold",3,1,null,"30s on/30s off"]]]),
mk("2025-03-03","quad","Lower Rep Squat + Accessories","abike",[["Squat",["Barbell Back Squat",1,10,75],["Barbell Back Squat",2,8,95],["Barbell Back Squat",2,8,115]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["BW Jump Squat",4,10,null]],["Circuit 2",["Trap Bar Deadlift",4,10,95],["Banded Adductor",4,15,null]],["Circuit 3",["Hamstring Curl",4,10,null,"2sec pause"],["Front Lunge",4,20,15,"alt"]],["Core",["Weighted Deadbug",3,20,null],["Russian Twist",3,20,null]]]),
mk("2025-03-10","quad","Squat + Sled Push","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,3,140]],["Core",["Weighted Situp",4,10,null,"medball"],["Leg Lift",4,10,null,"medball"]],["Circuit 1",["Sled Push/Drag",4,1,null,"2-45 plates"],["BW Sumo Squat",4,10,null]],["Circuit 2",["Barbell Hip Thrust",4,10,175],["BW Walking Lunge",4,1,null,"DnB"]],["Circuit 3",["Barbell Deficit RDL",4,8,75],["Farmer Carry",4,1,null,"Browns DnB"]]]),
mk("2025-03-24","quad","Squat + Trap Bar","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,3,140]],["Core",["Weighted Deadbug",3,20,null],["Russian Twist",3,20,null]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["BW Jump Squat",4,10,null]],["Circuit 2",["Trap Bar Deadlift",4,10,95],["Banded Adductor",4,20,null]],["Circuit 3",["Hamstring Curl",4,10,null,"2sec pause"],["Front Lunge",4,20,15]]]),
mk("2025-03-31","quad","Squat Percentage + Lunges","abike",[["Pre-exhaust",["Leg Curl",4,15,null,"2-45 plates"],["Leg Extension",4,15,null,"2-45 plates"]],["Squat",["Barbell Back Squat",1,12,88,"65%"],["Barbell Back Squat",5,10,110,"80%"]],["Core",["Weighted Situp",3,10,null],["Flutter Kick",3,1,null]],["Accessories",["DB Walking Lunge",4,20,20],["Hip Thruster",4,10,null]]]),
mk("2025-04-07","quad","Squat + KB Suitcase","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,3,140]],["Core",["Weighted Deadbug Crunch",3,10,null,"2 legs"],["Banded Glute Bridge March",3,10,null]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["KB Sumo Squat Pulse",4,20,null]],["Circuit 2",["Hamstring Curl",4,10,null,"2sec pause"],["Lunge Pulse",4,15,null,"each leg"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"yellow"],["Calf Raise",4,10,null],["GHD",4,10,null]]]),
mk("2025-04-21","lower","Sumo DL Intro","abike",[["Main",["Barbell Sumo Deadlift",1,8,95],["Barbell Sumo Deadlift",2,5,115],["Barbell Sumo Deadlift",2,5,135]],["Circuit 1",["Leg Extension",4,8,null,"2-45/5"],["Barbell RDL",4,8,95]],["Core",["Plate Crunch",1,10,null],["Heel Taps",1,10,null]],["Circuit 2",["Leg Curl",4,10,null,"2-45/5"],["KB Elevated Calf Raise",4,10,null]],["Finisher",["Barbell Walking Lunge",4,1,null,"10 down/10 back"],["GHD",4,10,null]]]),
mk("2025-04-28","lower","Sumo DL Volume","abike",[["Main",["Barbell Sumo Deadlift",1,8,95],["Barbell Sumo Deadlift",2,8,115],["Barbell Sumo Deadlift",1,8,135]],["Core",["Plate Crunch",1,10,null],["Heel Taps",1,10,null]],["Finisher",["BW Walking Lunge",4,1,null,"lunge/lunge/squat"],["GHD",4,10,null]],["Circuit 1",["Leg Extension",4,8,null,"2-45/5"],["Barbell RDL",4,8,95]],["Circuit 2",["Leg Curl",4,10,null,"2-45/5"],["KB Elevated Calf Raise",4,10,null]]]),
mk("2025-05-05","lower","Sumo DL Progression","abike",[["Main",["Barbell Sumo Deadlift",1,8,105],["Barbell Sumo Deadlift",2,8,115],["Barbell Sumo Deadlift",1,8,135]],["Core",["Weighted Situp",3,10,null],["Flutter Kick",3,30,null]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["Goblet Squat",4,10,null]],["Circuit 2",["Hamstring Curl",4,10,null,"2sec pause"],["Trap Bar Deadlift",4,10,null]],["Circuit 3",["Bulgarian Split Squat",4,8,20],["Banded Adductor",4,15,null]]]),
mk("2025-05-12","lower","Sumo DL Peak","abike",[["Main",["Barbell Sumo Deadlift",1,8,115],["Barbell Sumo Deadlift",2,8,125],["Barbell Sumo Deadlift",1,6,145]],["Core",["Banded Hip Thrust",3,10,null],["Hip Thrust Hold Adductors",3,10,null]],["Circuit 1",["Leg Extension",4,10,null,"2-45 plates"],["Incline Goblet Squat",4,10,null]],["Circuit 2",["Hamstring Curl",3,10,null,"2-45 plates"],["Single Leg RDL",3,8,35,"each"]],["Circuit 3",["Bulgarian Split Squat",3,8,20],["Bulgarian Split Squat",3,8,null,"BW"],["Calf Raise",3,10,null]]]),
mk("2025-05-19","quad","Squat + Hip Flexor","ahip",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,8,115],["Barbell Back Squat",1,8,125],["Barbell Back Squat",1,5,135],["Barbell Back Squat",1,5,140]],["Hip Flexor",["Banded Deadbug",3,10,null,"each"],["Banded Hip Thrust",3,8,null]],["Circuit 1",["Leg Extension",4,8,null,"2-45 plates"],["KB Swing",4,10,null,"yellow"]],["Circuit 2",["Hamstring Curl",4,8,null,"2-45 plates"],["Incline Goblet Squat",4,8,50]]]),
mk("2025-06-02","quad","Squat + Deficit Lunge","ahip",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,8,115],["Barbell Back Squat",1,8,125],["Barbell Back Squat",1,5,135],["Barbell Back Squat",1,5,140]],["Hip Flexor",["Banded Deadbug",3,10,null,"medball, each"],["Banded Hip Thrust",3,8,null,"medball"]],["Circuit 1",["Leg Extension",4,8,null,"2-45 plates"],["Reverse Lunge",4,8,20,"each"]],["Circuit 2",["Hamstring Curl",4,8,null,"2-45 plates"],["Incline Goblet Squat",4,8,50]]]),
mk("2025-06-09","quad","Squat + KB Suitcase","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,3,140]],["Core",["Deadbug Crunch",3,10,null,"2 legs"],["Russian Twist",3,20,null]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["KB Sumo Squat Pulse",4,20,null]],["Circuit 2",["Hamstring Curl",4,10,null,"2sec pause"],["Lunge Pulse",4,15,null,"each leg"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"yellow"],["Calf Raise",4,10,null],["GHD",4,10,null]]]),
mk("2025-06-23","quad","Light Squat + Landmine","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",3,10,115]],["Circuit 1",["Hip Thruster",4,10,125],["DB Walking Lunge",4,10,20]],["Core",["Dead Bug",4,20,null],["Plate Reverse Crunch",4,10,null]],["Circuit 2",["Leg Extension",4,8,null,"2-45/5"],["Landmine Hack Squat",4,10,15]],["Circuit 3",["Leg Curl",4,10,null,"2-45/5"],["GHD",4,10,null]]]),
mk("2025-06-30","quad","Squat + Sumo Pulse","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,5,130],["Barbell Back Squat",1,5,140]],["Core",["Weighted Situp",3,10,20,"medball"],["Russian Twist",3,20,20,"medball"]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["KB Sumo Squat Pulse",4,20,null,"red"]],["Circuit 2",["Hamstring Curl",4,10,null,"2sec pause"],["Lunge Pulse",4,15,15,"each leg"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"brown"],["Calf Raise",4,10,null],["Farmer Carry",4,1,null,"DnB"]]]),
mk("2025-07-07","quad","Squat + Trap Bar + Bike","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,5,130],["Barbell Back Squat",1,5,140]],["Hip Flexor",["Banded Deadbug",3,10,null,"medball"],["Banded Glute Bridge",3,10,null],["Banded Abductor Pulse",3,15,null]],["Circuit 1",["Leg Extension",4,10,null,"2sec pause"],["BW Jump Squat",4,10,null]],["Circuit 2",["Trap Bar Deadlift",4,10,95],["Banded Adductor",4,20,null]],["Circuit 3",["Hamstring Curl",4,10,null,"2sec pause"],["Front Lunge",4,20,15,"alt"]],["Finisher",["Cardio",3,2,null,"1min legs/1min arms"]]]),
mk("2025-07-14","quad","Squat PR 145 + Sled","abike",[["Core",["Plate Leg Raise to Situp",3,10,15],["Plate Reverse Crunch",3,10,15],["Plate Halo",3,10,15]],["Squat",["Barbell Back Squat",1,8,95],["Barbell Back Squat",1,6,120],["Barbell Back Squat",1,6,130],["Barbell Back Squat",1,5,140],["Barbell Back Squat",1,5,145]],["Circuit 1",["Bench Step Down",4,8,null,"each"],["Calf Raise",4,20,null,"browns"],["Barbell RDL",4,10,null]],["Circuit 2",["Sled Drag",4,1,null,"DnB, 4 plates"],["GHD",4,8,15,"plate"]]]),
mk("2025-07-28","quad","Squat 150 + RDL","apvc",[["Core",["Plate Crunch",4,10,null],["KB Kneeling Hip Circle",4,10,null]],["Squat",["Barbell Back Squat",1,8,95],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,8,130],["Barbell Back Squat",1,5,140],["Barbell Back Squat",1,5,150]],["Circuit 1",["Leg Extension",4,8,null,"2-45/10"],["Calf Raise",4,20,null,"browns"],["Barbell RDL",4,10,95]],["Circuit 2",["Leg Curl",4,8,null,"2-45/10"],["Incline Goblet Squat",4,10,null,"red"]]]),
mk("2025-08-04","quad","Squat 150 Repeat","apvc",[["Squat",["Barbell Back Squat",1,8,95],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,8,130],["Barbell Back Squat",1,5,140],["Barbell Back Squat",1,5,150]],["Core",["Weighted Situp",4,10,null],["Russian Twist",4,10,null]],["Circuit 1",["Leg Extension",4,8,null,"2-45 plates"],["Barbell RDL",4,8,null,"25s"]],["Circuit 2",["Hamstring Curl",4,8,null,"2-45 plates"],["Incline Goblet Squat",4,8,50]],["Finisher",["Sled Drag",4,1,null,"3-4 plates"],["KB Calf Raise",4,10,null,"purple"]]]),
mk("2025-08-11","quad","Squat 150 + Sled","apvc",[["Squat",["Barbell Back Squat",1,8,95],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,8,130],["Barbell Back Squat",1,5,140],["Barbell Back Squat",1,5,150]],["Core",["Plate Crunch",3,10,null,"2 legs"],["Banded Glute Bridge March",3,10,null]],["Circuit 1",["Sled Drag",4,1,null,"3-4 plates"],["KB Calf Raise",4,10,null,"purple"]],["Circuit 2",["Hamstring Curl",4,10,null,"2-45 plates"],["KB Sumo Squat Pulse",4,20,null]]]),
mk("2025-08-18","quad","Squat + HT Combo","apvc",[["Squat",["Barbell Back Squat",1,7,95],["Barbell Back Squat",1,7,120],["Barbell Back Squat",1,7,130],["Barbell Back Squat",1,7,140]],["Core",["Plate Reverse Crunch",1,10,15],["Banded Adductor",1,20,null]],["Hip Thrust",["Hip Thruster",1,8,140],["Hip Thruster",1,8,160],["Hip Thruster",1,8,180]],["Finisher",["Walking Lunge",1,10,null,"DnB"],["KB Calf Raise",1,10,null]]]),
mk("2025-08-25","quad","Squat + Bulgarian","abike",[["Squat",["Barbell Back Squat",1,10,95],["Barbell Back Squat",1,10,110],["Barbell Back Squat",1,8,120],["Barbell Back Squat",1,3,140]],["Core",["Weighted Deadbug Crunch",3,10,null,"2 legs"],["Banded Glute Bridge March",3,10,null]],["Circuit 1",["Leg Extension",4,8,null,"2sec pause"],["KB Sumo Squat Pulse",4,20,null,"red"]],["Circuit 2",["Hamstring Curl",4,8,null,"2sec pause"],["Bulgarian Split Pulse BW",4,15,null,"each, inner DB"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"purple"],["Calf Raise",4,10,null]]]),
mk("2025-09-08","glute","HT Ramp Up","apvc",[["Main",["Hip Thruster",1,10,145],["Hip Thruster",1,10,165],["Hip Thruster",1,8,185],["Hip Thruster",1,8,195]],["Circuit 1",["Leg Extension",3,10,null,"2-45 plates"],["Curtsy Lunge",3,8,25,"each"],["Calf Raise",3,10,null,"45 plate"]],["Circuit 2",["Leg Curl",3,10,null,"2-45 plates"],["Sumo Squat",3,10,null,"red"]],["Core",["Plate Reverse Crunch",1,10,15],["Banded Adductor",1,20,null]]]),
mk("2025-09-15","glute","HT + Reverse Lunge","apvc",[["Main",["Hip Thruster",1,10,145],["Hip Thruster",1,10,165],["Hip Thruster",1,8,185],["Hip Thruster",1,8,195]],["Circuit 1",["Leg Extension",4,10,null,"2-45 plates"],["Reverse Lunge",4,8,20,"each"]],["Circuit 2",["Hamstring Curl",4,10,null,"2-45 plates"],["Incline Goblet Squat",4,8,50]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]]]),
mk("2025-09-22","glute","HT + Curtsy","apvc",[["Main",["Hip Thruster",1,10,145],["Hip Thruster",1,10,165],["Hip Thruster",1,8,185],["Hip Thruster",1,8,195]],["Circuit 1",["Leg Extension",4,8,null,"2-45 plates"],["Barbell RDL",4,8,null,"15s"],["Cable Crunch Hold",4,10,50]],["Circuit 2",["Hamstring Curl",4,10,null,"2-45 plates"],["Squat to Curtsy Lunge",4,10,20]]]),
mk("2025-09-29","quad","Squat + Walking Lunge","abike",[["Squat",["Barbell Back Squat",1,7,95],["Barbell Back Squat",1,7,120],["Barbell Back Squat",1,7,130],["Barbell Back Squat",1,5,140]],["Core",["Plate Crunch",1,10,null],["Heel Taps",1,10,null]],["Circuit 1",["Walking Lunge",4,1,10,"lunge/lunge/squat DnB"],["GHD",4,10,null]],["Circuit 2",["Leg Curl",4,10,null,"2-45/5"],["KB Elevated Calf Raise",4,10,null,"yellows"]],["Circuit 3",["Single Leg Extension",4,8,null,"45 plate"],["Barbell RDL",4,8,95]]]),
mk("2025-10-06","quad","Mobility Focus + Extensions","amob",[["Mobility",["Banded Pigeon",1,1,null],["Banded Hamstring Stretch",1,1,null],["Banded Hamstring Stretch",1,10,null,"toes up on box"]],["Circuit 1",["Single Leg Extension",4,8,null,"45 plate"],["Wall Band Butt Tap",4,10,null,"slow"]],["Circuit 2",["Leg Curl",4,10,null,"2-45/5"],["Weighted Shin Box to High Kneel",4,8,null,"pinks, each"]],["Finisher",["Cardio",1,1,null]]]),
mk("2025-10-20","quad","Descending Squat + Curtsy","amob",[["Squat",["Barbell Back Squat",1,8,95,"warmup"],["Barbell Back Squat",1,5,150],["Barbell Back Squat",1,5,140],["Barbell Back Squat",1,8,130],["Barbell Back Squat",1,8,120]],["Circuit 1",["Leg Extension",4,8,null,"2-45 plates"],["Barbell RDL",4,8,null,"15s"],["Cable Crunch Hold",4,10,50]],["Circuit 2",["Hamstring Curl",4,8,null,"2-45 plates"],["Elevated Curtsy Lunge",4,8,20,"each"],["DB Side Crunch",4,10,null,"each"]]]),
mk("2025-10-27","quad","Squat + Bulgarian Pulse","amob",[["Squat",["Barbell Back Squat",1,7,95],["Barbell Back Squat",1,7,120],["Barbell Back Squat",1,7,130],["Barbell Back Squat",1,5,140]],["Core",["Banded Glute Bridge",3,10,null,"blue"],["Banded Abductor Pulse",3,20,null]],["Circuit 1",["Leg Extension",4,8,null,"tempo, 45/35"],["KB Sumo Squat 1.5",4,10,null,"red"]],["Circuit 2",["Hamstring Curl",4,8,null,"tempo, 45/35"],["Bulgarian Split Pulse BW",4,15,null,"each, inner DB"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"purple"],["Calf Raise",4,10,null]]]),
mk("2025-11-03","glute","HT + Sled Pull","amob",[["Main",["Hip Thruster",1,10,145],["Hip Thruster",1,10,165],["Hip Thruster",1,8,185],["Hip Thruster",1,8,195]],["Circuit 1",["Hamstring Curl",4,10,null,"2-45 plates"],["Sled Drag",4,1,null,"4-5 plates"],["Single Leg Calf Raise",4,12,null,"BW"]],["Circuit 2",["Cable Crunch Hold",4,10,null],["Adductor Plate Slide",4,10,5]]]),
mk("2025-11-10","glute","HT + RDL","amob",[["Main",["Hip Thruster",1,10,145],["Hip Thruster",1,10,165],["Hip Thruster",1,8,185],["Hip Thruster",1,8,195]],["Circuit 1",["Single Leg Extension",4,8,null,"45 plate"],["Cable Crunch Hold",4,10,null],["Barbell RDL",4,8,85]],["Circuit 2",["Leg Curl",4,10,null,"2-45/5"],["Single Leg Calf Raise",4,10,null,"each"]]]),
mk("2025-11-17","glute","Heavy HT 255","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,195],["Hip Thruster",1,5,225],["Hip Thruster",2,5,255]],["Circuit 1",["Sled Drag",4,1,null,"4 plates DnB"],["Calf Raise",4,12,null]],["Circuit 2",["Single Leg Curl",4,10,null,"45 plate"],["Barbell RDL",4,8,null,"20s"]],["Core",["Band Hold Leg Lift",3,10,null],["Hollow Hold",3,10,null]]]),
mk("2025-11-24","glute","HT 255 + Bulgarian","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,195],["Hip Thruster",1,5,225],["Hip Thruster",2,5,255]],["Circuit 1",["Single Leg Extension",4,10,null,"45 plate"],["Barbell RDL",4,8,null,"25s"]],["Circuit 2",["Single Leg Curl",4,10,null,"45 plate"],["Curtsy Lunge",4,8,25,"each"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"purple"],["Calf Raise",4,10,null],["Cable Crunch Hold",4,10,null]]]),
mk("2025-12-12","glute","HT 255 + Sled","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,195],["Hip Thruster",1,5,225],["Hip Thruster",2,5,255]],["Circuit 1",["Sled Drag",4,1,null,"4 plates DnB"],["Cable Crunch",4,16,null,"slow"],["Bent Knee Calf Raise",4,12,null]],["Circuit 2",["Single Leg Curl",4,10,null,"45 plate"],["Curtsy Lunge",4,8,25,"each"]],["Core",["Ab Rollout",4,10,null],["Side Plank Hip Dip",4,10,null,"each"]]]),
mk("2025-12-19","glute","HT 265 + Landmine","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,185],["Hip Thruster",1,5,235],["Hip Thruster",2,5,265]],["Circuit 1",["Hamstring Curl",4,8,null,"2-45 plates"],["Landmine Sumo Squat",4,10,35]],["Circuit 2",["Landmine Side Drop",4,10,null],["Landmine Side Crunch",4,10,null,"each"]],["Circuit 3",["Single Leg RDL with Knee Drive",4,8,10,"each"],["Calf Raise",4,10,20,"each"]]]),
mk("2025-12-26","glute","HT 265 + Ballerina","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,185],["Hip Thruster",1,5,235],["Hip Thruster",2,5,265]],["Circuit 1",["Single Leg Extension",4,10,null,"45 plate"],["Barbell RDL",4,8,null,"25s"]],["Circuit 2",["Single Leg Curl",4,10,null,"45 plate"],["Ballerina Bulgarian",4,8,null,"pinks, each"]],["Circuit 3",["KB Suitcase Deadlift",4,10,null,"purple"],["Calf Raise",4,10,null],["Cable Crunch Hold",4,10,null]]]),
mk("2026-01-02","full","Full Body HT Focus","abike",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,185],["Hip Thruster",1,5,235],["Hip Thruster",2,5,265]],["Upper Circuit",["Concentration Curl",4,10,15,"15-20"],["Incline Chest Press",4,8,20,"20-25"],["Single Arm Tricep Extension",4,12,90]],["Core",["Band Hold Leg Lift",1,10,null],["Flutter Kick",1,20,null]],["Lower Circuit",["Leg Extension",4,10,null,"2-45 plates"],["Cable Row",4,10,55,"55-60"],["Deficit Curtsy Lunge",4,10,20]]]),
mk("2026-01-09","glute","Glute HT 195","abike",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",5,5,195,".5 & 1 full"]],["Circuit 1",["Single Leg Curl",4,8,null,"tempo, 45 plate"],["Incline Goblet Squat",4,8,null,"green"],["Bent Knee Calf Raise",4,12,null]],["Core",["Leg Lift",1,10,null],["Banded Clamshell",1,10,null,"each"]],["Finisher",["Cardio",6,1,null,"60s on/90s off"]]]),
mk("2026-01-16","glute","Glute HT 205","abike",[["Main",["Hip Thruster",1,8,185],["Hip Thruster",4,8,205]],["Circuit 1",["Bulgarian Split to Lunge",3,5,10,"each, BW/10"]],["Core",["Wall Ball Ab Pass",1,6,null],["Beast Wallball Side Rotation",1,8,null,"each"]],["Circuit 2",["Leg Curl",4,8,null,"45/35"],["Sumo Squat",4,10,null,"red"]],["Finisher",["Cardio",6,1,null,"1min run/90s walk"]]]),
mk("2026-01-19","upper","Upper Body","abike",[["Circuit 1",["Incline Curl",4,8,12,"12-15"],["Single Arm Tricep Extension",4,10,40],["Incline Row",4,6,35,"35-40"]],["Core",["Wall Ball Ab Pass",3,6,null],["Ab Rotation",3,1,null]],["Circuit 2",["KB High Pull",4,8,null,"yellow"],["Single Arm Cable Lat Pulldown",4,8,40],["DB Chest Press",4,8,25]],["Finisher",["Cardio",6,1,null,"1min run/90s walk"]]]),
mk("2026-01-23","glute","HT 275 PR","apvc",[["Main",["Hip Thruster",1,8,165],["Hip Thruster",1,8,185],["Hip Thruster",1,5,235],["Hip Thruster",2,5,275]],["Circuit 1",["Hamstring Curl",4,8,null,"2-45 plates"],["Landmine Sumo Squat",4,10,35]],["Circuit 2",["Landmine Side Drop",4,10,null],["Landmine Side Crunch",4,10,null,"each"]],["Circuit 3",["Single Leg RDL with Knee Drive",4,8,10,"each"],["Calf Raise",4,10,20,"each"]]]),
mk("2026-02-06","glute","Glute HT 205 + Sled","abike",[["Main",["Hip Thruster",1,8,185],["Hip Thruster",4,5,205]],["Circuit 1",["Single Leg Curl",4,8,null,"45 plate"],["Sumo Squat",4,10,null,"red/white"],["Wall Sit Hold",4,1,null,"30s"]],["Core",["Leg Lift",1,10,null],["Banded Clamshell",1,10,null,"each"]],["Circuit 2",["Sled Push/Drag",4,1,null,"5 plates DnB"],["Calf Raise",4,10,null,"purples"]],["Finisher",["Cardio",8,1,null,"1min run/30s walk"]]]),
mk("2026-02-13","lower","Trap Bar Heavy 195","abike",[["Main",["Trap Bar Deadlift",1,8,135],["Trap Bar Deadlift",2,6,155],["Trap Bar Deadlift",1,3,175],["Trap Bar Deadlift",1,3,195]],["Core",["Crunch On Box",3,10,null],["Hip Flexor",3,8,null,"each"]],["Circuit 1",["Leg Curl",4,8,null,"tempo, 45/35"],["Reverse + Curtsy Lunge",4,8,20,"each"],["Bent Knee Calf Raise",4,10,null],["Adductor Plate Slide",4,20,10]],["Finisher",["Cardio",1,1,null,"1:15 run/30s walk"]]]),
];

const SEED_ADAM=[
// Dec 2024: Bench max 175→185
mk("2024-12-23","push","Push Day","abike",[["Core",["V-Up",3,14,null],["Butterfly Situp",3,10,null]],["Bench",["Barbell Bench Press",1,10,115,"65%"],["Barbell Bench Press",3,5,140,"80%"],["Barbell Bench Press",2,8,115,"failure 65%"]],["Circuit 1",["Push Up",4,1,null,"1min on/1min off"]],["Circuit 2",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Cable Tricep Extension",4,12,80]]]),
mk("2024-12-30","push","Push Day","abike",[["Core",["V-Up",3,14,null],["Butterfly Situp",3,10,null]],["Bench",["Barbell Bench Press",1,12,120,"65%"],["Barbell Bench Press",2,5,148,"80%"],["Barbell Bench Press",2,2,166,"90%"],["Barbell Bench Press",1,8,null,"failure 70%"]],["Circuit 1",["Push Up",4,20,null],["Skull Crusher",4,12,40]],["Circuit 2",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Cable Tricep Extension",4,12,80]]]),
// Jan 2025
mk("2025-01-13","push","Push Day","abike",[["Core",["Alt V-Up",3,20,null,"total"],["Butterfly Situp",3,12,null]],["Bench",["Barbell Bench Press",1,12,null,"70%"],["Barbell Bench Press",2,8,null,"80%"],["Barbell Bench Press",2,3,null,"90%"],["Barbell Bench Press",1,12,null,"70%"]],["Circuit 1",["Barbell Military Press",4,7,75],["Push Up",4,20,null],["Skull Crusher",4,12,50]],["Circuit 2",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Lateral Raise",4,15,15]]]),
mk("2025-01-20","push","Push Day","abike",[["Core",["Alt V-Up",3,20,null],["Butterfly Situp",3,12,null]],["Bench",["Barbell Bench Press",1,12,130,"70%"],["Barbell Bench Press",5,5,157,"85%"]],["Circuit 1",["DB Incline Chest Press",4,8,40],["DB Push Press",4,10,35]],["Circuit 2",["Push Up",3,1,null,"1min on/1min off"]],["Circuit 3",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Lateral Raise",4,15,15]]]),
mk("2025-01-27","push","Bench PR Attempt","abike",[["Core",["Alt V-Up",3,20,null],["Butterfly Situp",3,12,null]],["Bench",["Barbell Bench Press",1,8,null,"65%"],["Barbell Bench Press",1,1,null,"85%"],["Barbell Bench Press",1,1,null,"PR attempt"]],["Circuit 1",["DB Incline Chest Press",4,8,40],["DB Push Press",4,10,35]],["Circuit 2",["Push Up",3,1,null,"1min on/1min off"]],["Circuit 3",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Lateral Raise",4,15,15]]]),
// Feb 2025: Bench max 200
mk("2025-02-03","push","Push Day","abike",[["Core",["Russian Twist",3,20,20],["Weighted Situp",3,10,20]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",3,5,160,"80%"],["Barbell Bench Press",2,8,130,"failure 65%"]],["Circuit 1",["DB Bicep Curl",4,10,25],["Seated Shoulder Press",4,8,35]],["Circuit 2",["DB T Raise",4,15,15],["Cable Tricep Extension",4,12,80]],["Finisher",["Push Up",3,1,null,"to failure, 1min rest"]]]),
mk("2025-02-10","push","Push Day","abike",[["Core",["Weighted Deadbug",3,1,20,"lat pullover"]],["Bench",["Barbell Bench Press",1,12,130,"65%"],["Barbell Bench Press",2,5,160,"80%"],["Barbell Bench Press",2,2,180,"90%"],["Barbell Bench Press",1,8,140,"70%"]],["Circuit 1",["DB Push Press",4,10,null],["Farmer Carry",4,1,null,"DnB + shrugs"]],["Circuit 2",["Lateral Raise",4,15,12],["DB Incline Crush Grip Press",4,10,30],["Cable Tricep Extension",4,12,90]]]),
mk("2025-02-17","push","Push Day","abike",[["Core",["Weighted Deadbug",3,1,null,"lat pullover"]],["Bench",["Barbell Bench Press",1,12,140,"70%"],["Barbell Bench Press",2,8,160,"80%"],["Barbell Bench Press",2,3,180,"90%"],["Barbell Bench Press",1,12,140,"70%"]],["Circuit 1",["Barbell Military Press",4,7,75],["Bench Dip",4,15,null],["Skull Crusher",4,12,35]],["Circuit 2",["DB Front Raise",4,15,15],["DB Incline Crush Grip Press",4,10,30],["Lateral Raise",4,15,15]]]),
mk("2025-02-24","push","Push Day","abike",[["Core",["DB Halo With Twist",3,12,25],["DB Single Arm Press March",3,20,25]],["Bench",["Barbell Bench Press",1,12,130,"65%"],["Barbell Bench Press",4,8,166,"83%"]],["Circuit 1",["DB Thruster",4,8,35],["Cable Row",4,10,null]],["Circuit 2",["Plate Front Raise Press",4,8,25,"each"],["Incline Curl",4,10,null]],["Circuit 3",["Leg Extension",4,10,null,"2-45 plates"],["Cable Tricep Extension",4,12,80]],["Finisher",["Cardio",3,2,null,"arms 1min/legs 1min"]]]),
// Mar 2025
mk("2025-03-03","push","Push + Accessories","abike",[["Core",["DB Halo With Twist",3,12,25],["DB Single Arm Press March",3,20,25]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",3,5,160,"80%"],["Barbell Bench Press",2,8,130,"failure 65%"]],["Circuit 1",["DB Thruster",4,10,25],["Cable Lat Pull Down",4,10,null]],["Circuit 2",["5-5-5 Curl",4,1,20],["Seated Shoulder Press",4,10,30],["Banded Tricep Kickback",4,10,20]],["Circuit 3",["Leg Extension",4,10,null,"2sec pause"],["KB Shoulder Shrug",4,10,null,"greens"],["KB Suitcase Deadlift",4,10,null,"greens"]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
mk("2025-03-10","push","Bench Max Test","abike",[["Core",["Russian Twist",3,20,20],["Weighted Situp",3,10,20]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",1,5,160,"80%"],["Barbell Bench Press",1,3,180,"90%"],["Barbell Bench Press",1,1,200,"100%"],["Barbell Bench Press",1,8,140,"70%"]],["Circuit 1",["DB Bicep Curl",4,10,25],["KB Squat to High Pull",4,10,null],["Seated Shoulder Press",4,8,35]],["Circuit 2",["Leg Extension",3,10,null,"2sec pause"],["Push Up",3,10,null]],["Circuit 3",["DB T Raise",4,10,12],["Banded Tricep Pushdown",4,15,null]],["Circuit 4",["Leg Curl",3,10,null,"2sec pause"],["Push Up",3,10,null]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
mk("2025-03-17","push","Upper Focus + Lower","abike",[["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,20]],["Bench",["Barbell Bench Press",1,12,130,"65%"],["Barbell Bench Press",4,8,170,"85%"]],["Circuit 1",["DB Thruster",4,8,30],["DB Lat Pullover",4,10,25]],["Circuit 2",["Leg Extension",4,10,null,"2-45 plates"],["DB ISO Hold Bicep Curl",4,8,null]],["Circuit 3",["Plate Front Raise Press",4,8,25,"each"],["Banded Tricep Kickback",4,12,80]],["Circuit 4",["Barbell RDL",3,8,125],["Push Up",3,10,null]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
mk("2025-03-24","push","Bench + Clean & Squat","abike",[["Core",["DB Halo With Twist",3,10,25],["DB Deadbug Crunch",3,20,25]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",3,5,160,"80%"],["Barbell Bench Press",2,8,130,"failure 65%"]],["Circuit 1",["KB Clean & Squat",4,10,null,"brown"],["DB Row",4,8,45,"each"]],["Circuit 2",["7-7-7 Curl",4,1,20],["Cable Tricep Extension",4,10,80]],["Circuit 3",["Leg Extension",4,10,null,"2sec pause"],["Barbell RDL",4,10,null]],["Finisher",["Push Up",3,1,null,"30sec work/30sec rest"]]]),
mk("2025-03-31","push","Bench 185 + Thrusters","abike",[["Core",["DB Halo With Twist",3,12,25],["DB Single Arm Press March",3,20,30]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",4,6,185,null]],["Circuit 1",["DB Thruster",4,8,35],["Cable Row",4,10,45]],["Circuit 2",["Plate Front Raise Press",4,8,25,"each"],["Incline Curl",4,8,20],["DB Incline Crush Grip Press",4,8,null]],["Circuit 3",["Push Up",4,10,null],["Leg Extension",4,10,null],["Cable Tricep Extension",4,12,80]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
// Apr 2025
mk("2025-04-07","push","Bench + DB Curls","abike",[["Core",["DB Deadbug Crunch",3,10,20],["Heel Taps",3,20,null]],["Bench",["Barbell Bench Press",1,10,130,"65%"],["Barbell Bench Press",3,5,160,"80%"],["Barbell Bench Press",2,8,130,"failure 65%"]],["Circuit 1",["DB Clean & Squat",4,8,null,"brown"],["DB Row",4,8,45,"each"]],["Circuit 2",["DB Bicep Curl",4,8,20],["DB Bicep Curl",4,8,20],["Cable Tricep Extension",4,10,80]],["Circuit 3",["Seated Push Press",4,8,null],["Lateral Raise",4,8,null],["Push Up",4,8,null]],["Circuit 4",["Leg Extension",4,10,null,"2sec pause"],["Barbell RDL",4,10,null]]]),
mk("2025-04-14","push","Upper Focus + Lower","abike",[["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,20]],["Bench",["Barbell Bench Press",1,10,130,"65%, 3ct descent"],["Barbell Bench Press",4,8,170,"85%"]],["Circuit 1",["DB Thruster",4,8,30],["DB ISO Hold Bicep Curl",4,8,null]],["Circuit 2",["Leg Extension",4,10,null,"2-45 plates"],["Kneeling Lat Pulldown",4,10,50]],["Circuit 3",["Leg Curl",3,10,null,"2-45 plates"],["Push Up",3,10,null]],["Circuit 4",["Plate Front Raise Press",4,8,25,"each"],["Banded Tricep Kickback",4,12,80]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
mk("2025-04-21","push","Bench Ramp + Farmers","abike",[["Bench",["Barbell Bench Press",1,10,135],["Barbell Bench Press",1,8,150],["Barbell Bench Press",1,6,165],["Barbell Bench Press",1,1,185,"before failure"],["Bench Dip",4,10,null]],["Circuit 1",["DB T Raise",4,8,15],["Incline Curl",4,8,20]],["Core",["Russian Twist",3,20,null],["Weighted Situp",3,15,null]],["Circuit 2",["Push Up",4,10,null],["Goblet Squat",4,8,50]],["Circuit 3",["DB Push Press",4,8,null],["Farmer Carry",4,1,null,"heavy DnB"]]]),
// May 2025: Max 200→210
mk("2025-05-05","push","Bench Pyramid","abike",[["Core",["Weighted Situp",3,10,null],["Flutter Kick",3,30,null]],["Bench",["Barbell Bench Press",1,12,130,"65%"],["Barbell Bench Press",2,6,160,"80%"],["Barbell Bench Press",2,3,180,"90%"],["Barbell Bench Press",1,8,140,"70%"]],["Circuit 1",["DB Bicep Curl",4,8,null],["DB Bicep Curl",4,8,null],["Diagonal Tricep Cable",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,10,null],["Goblet Squat",4,10,null]],["Circuit 3",["Leg Curl",4,10,null],["KB Calf Raise",4,10,null,"red"]],["Finisher",["Push Up",3,1,null,"to failure, 1min rest"]]]),
mk("2025-05-12","push","Bench Ramp + T's","abike",[["Bench",["Barbell Bench Press",1,10,135],["Barbell Bench Press",1,8,150],["Barbell Bench Press",1,6,165],["Barbell Bench Press",1,1,185,"before failure"],["Bench Dip",4,10,null]],["Circuit 1",["DB T Raise",4,15,10],["Goblet Squat",4,15,35],["Incline Curl",4,15,15]],["Core",["Russian Twist",3,20,null],["Butterfly Situp",3,15,null]],["Circuit 2",["Push Up",4,15,null],["Farmer Carry",4,1,null,"heavy"],["DB Push Press",4,15,25]]]),
mk("2025-05-19","push","Bench Max Test 210","abike",[["Core",["Plate Halo",3,12,25],["Plate March",3,20,25]],["Bench",["Barbell Bench Press",1,10,137,"65%"],["Barbell Bench Press",3,5,168,"80%"],["Barbell Bench Press",2,8,137,"failure 65%"]],["Circuit 1",["KB Clean & Squat",4,8,null,"brown"],["Cable Lat Pull Down",4,10,null]],["Circuit 2",["DB Bicep Curl",4,10,25,"3sec"],["DB Incline Crush Grip Press",4,10,30],["Bench Dip",4,10,null]],["Circuit 3",["Leg Extension",4,10,null,"2sec pause"],["KB Shoulder Shrug",4,10,null,"greens"],["Plate Front Raise Press",4,8,35,"each"]],["Finisher",["Cardio",3,2,null,"arms/legs"]]]),
// Jun 2025
mk("2025-06-02","push","Upper Focus 3ct Descent","abike",[["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,20]],["Bench",["Barbell Bench Press",1,10,137,"65%, 3ct descent"],["Barbell Bench Press",4,6,179,"85%"]],["Circuit 1",["DB Thruster",4,8,30],["Incline Curl",4,10,null],["Cable Tricep Kickback",4,10,40,"each"]],["Circuit 2",["Leg Extension",4,10,null,"2-45 plates"],["Push Up",4,15,null],["Plate Front Raise Press",4,8,25,"each"]],["Circuit 3",["Leg Curl",3,10,null,"2-45 plates"],["Around the World",3,10,20],["Calf Raise",3,15,null,"greens"]],["Finisher",["Cardio",4,2,null,"arms/legs"]]]),
mk("2025-06-09","push","Bench + Landmine","abike",[["Bench",["Barbell Bench Press",1,10,135],["Barbell Bench Press",1,10,150],["Barbell Bench Press",1,6,165],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,1,185,"before failure"]],["Circuit 1",["Landmine Thruster",4,10,35],["DB ISO Hold Bicep Curl",4,10,25,"each"],["Cable Tricep Extension",4,10,null]],["Core",["Landmine Side Drop",4,10,10],["Landmine Side Crunch",4,10,null,"each"],["Push Up",4,10,null]],["Circuit 2",["Landmine Kneeling Push Press",4,8,null,"each"],["Farmer Carry",4,1,null,"heavy DnB"],["DB Front Raise",4,10,15]]]),
mk("2025-06-23","push","Bench Ramp + Curls","abike",[["Bench",["Barbell Bench Press",1,10,135],["Barbell Bench Press",1,10,150],["Barbell Bench Press",1,6,165],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,1,185,"before failure"]],["Circuit 1",["Incline Curl",4,5,null],["Incline Hammer Curl",4,5,null],["Cable Tricep Extension",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,8,null],["Lateral Raise",4,10,null],["Walking Lunge",4,10,null,"out & back"]],["Circuit 3",["Leg Curl",4,10,null],["Push Up",4,10,null],["KB Calf Raise",4,10,null,"red"]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]]]),
mk("2025-06-30","push","Bench 175 + Thrusters","abike",[["Bench",["Barbell Bench Press",1,10,135],["Barbell Bench Press",2,8,155],["Barbell Bench Press",2,6,175]],["Core",["Weighted Situp",3,10,20,"medball"],["Russian Twist",3,20,20,"medball"]],["Circuit 1",["DB Thruster",4,8,30],["DB ISO Hold Bicep Curl",4,10,25],["Cable Tricep Extension",4,10,40]],["Circuit 2",["Leg Extension",4,10,null,"2-45 plates"],["Push Up",4,10,null],["Plate Front Raise Press",4,8,25,"each"]],["Circuit 3",["Leg Curl",3,10,null,"2-45 plates"],["Around the World",3,10,20],["KB Calf Raise",3,15,null,"greens"]]]),
// Jul 2025: Max 210→225
mk("2025-07-07","push","Bench 210 Full Test","abike",[["Bench",["Barbell Bench Press",1,10,136,"65%"],["Barbell Bench Press",1,5,168,"80%"],["Barbell Bench Press",1,3,189,"90%"],["Barbell Bench Press",1,1,210,"100%"],["Barbell Bench Press",1,8,140,"70%"]],["Circuit 1",["DB Bicep Curl",4,8,30],["DB Bicep Curl",4,8,30],["Diagonal Tricep Cable",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,10,null,"2 plates"],["Cable Crunch Hold",4,10,null,"total"],["Bench Step Down",4,8,null,"each"]],["Circuit 3",["Leg Curl",4,10,null,"2 plates"],["Plate Crunch",4,10,null],["DB RDL",4,10,45]],["Finisher",["Push Up",4,1,null,"to failure, 2min rest"]]]),
mk("2025-07-14","push","Bench PR 220","abike",[["Bench",["Barbell Bench Press",1,8,136,"65%"],["Barbell Bench Press",1,3,179,"85%"],["Barbell Bench Press",1,1,220,"PR"]],["Circuit 1",["Landmine Thruster",4,10,45],["DB ISO Hold Bicep Curl",4,10,25,"each"],["Cable Tricep Extension",4,10,45]],["Core",["Plate Leg Raise to Situp",1,10,15],["Plate Crunch",1,10,15],["Plate Halo",1,10,15]],["Circuit 2",["Landmine Kneeling Push Press",4,8,null,"each"],["Farmer Carry",4,1,null,"heavy DnB"],["Lateral Raise",4,10,15]]]),
mk("2025-07-28","push","Bench %s + Ground OH","abike",[["Core",["Plate Crunch",4,10,null,"into leg lift"],["KB Kneeling Hip Circle",4,10,null]],["Bench",["Barbell Bench Press",1,10,146,"65%"],["Barbell Bench Press",3,5,191,"85%"],["Barbell Bench Press",2,8,169,"failure 75%"]],["Circuit 1",["Ground to Overhead",4,10,35],["Incline Curl",4,9,30],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Leg Extension",4,10,null,"2-45/10"],["DB Leaning Lateral Raise",4,10,20,"each"],["Cable Tricep Extension",4,10,85]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
// Aug 2025: Max 225
mk("2025-08-04","push","Bench %s + Sled","abike",[["Bench",["Barbell Bench Press",1,10,146,"65%"],["Barbell Bench Press",3,5,191,"85%"],["Barbell Bench Press",2,8,169,"failure 75%"]],["Circuit 1",["Hammer Curl",1,15,45,"start 45"],["Bench Dip",1,10,null],["DB Front Raise",1,10,null]],["Core",["Weighted Situp",4,10,null],["Russian Twist",4,10,null]],["Finisher",["Sled Drag",4,1,null,"5 plates DnB"],["Push Up",4,15,null]]]),
mk("2025-08-11","push","Bench 95% + Landmine","abike",[["Bench",["Barbell Bench Press",2,8,146,"65%"],["Barbell Bench Press",2,5,191,"85%"],["Barbell Bench Press",1,3,214,"95%"]],["Circuit 1",["Landmine Side Drop",4,10,35],["DB ISO Hold Bicep Curl",4,8,35,"each"],["Cable Tricep Extension",4,10,45]],["Core",["Plate Leg Raise to Situp",1,10,15],["Plate Crunch",1,10,15]],["Circuit 2",["Landmine Kneeling Push Press",4,8,10,"each"],["Farmer Carry",4,1,null,"heavy DnB"],["Lateral Raise",4,8,20]]]),
mk("2025-08-18","push","Bench %s + Glute Bridge","abike",[["Bench",["Barbell Bench Press",1,10,146,"65%"],["Barbell Bench Press",3,5,191,"85%"],["Barbell Bench Press",2,8,169,"failure 75%"]],["Circuit 1",["Ground to Overhead",4,10,35],["Incline Curl",4,9,30],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Banded Glute Bridge Lat Pullover",4,10,null],["Banded Glute Bridge Abductor Pulse",4,20,null]],["Circuit 3",["Leg Extension",4,10,null,"2-45/10"],["DB Front Raise",4,10,20],["Cable Tricep Extension",4,10,85]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
mk("2025-08-25","push","Bench 225 Full Test","abike",[["Bench",["Barbell Bench Press",1,10,146,"65%"],["Barbell Bench Press",1,5,180,"80%"],["Barbell Bench Press",1,3,202,"90%"],["Barbell Bench Press",1,1,225,"100%"],["Barbell Bench Press",1,8,157,"70%"]],["Circuit 1",["DB Bicep Curl",4,8,30],["DB Bicep Curl",4,8,30],["Diagonal Tricep Cable",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,10,null,"2 plates"],["Cable Crunch Hold",4,10,null],["Bench Step Down",4,8,null,"each"]],["Circuit 3",["Leg Curl",4,10,null,"2 plates"],["Plate Crunch",4,10,null],["DB RDL",4,10,45]],["Finisher",["Push Up",4,1,null,"to failure, 2min rest"]]]),
// Sep 2025: Max 225→240
mk("2025-09-08","push","Bench %s + Ground OH","abike",[["Bench",["Barbell Bench Press",1,10,146,"65%"],["Barbell Bench Press",3,5,191,"85%"],["Barbell Bench Press",2,8,169,"failure 75%"]],["Circuit 1",["Ground to Overhead",4,10,35],["Incline Curl",4,8,35],["Leg Curl",4,10,null,"2-45/15"]],["Circuit 2",["Banded Glute Bridge Lat Pullover",4,10,null],["Banded Glute Bridge Abductor Pulse",4,20,null]],["Circuit 3",["Leg Extension",4,10,null,"2-45/15"],["Plate Front Raise Press",4,10,35],["Cable Tricep Extension",4,10,35,"each, palm down"]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
mk("2025-09-14","push","Bench PR 240","abike",[["Bench",["Barbell Bench Press",1,8,146,"65%"],["Barbell Bench Press",1,3,191,"85%"],["Barbell Bench Press",1,3,225,"100%"],["Barbell Bench Press",1,1,240,"PR"]],["Circuit 1",["Barbell Curl",4,10,null,"10/5 plates"],["Cable Crunch Hold",4,10,80],["Bench Dip",4,10,45]],["Circuit 2",["Sled Drag",4,1,null,"5 plates"],["Calf Raise",4,10,null]],["Circuit 3",["Seated Shoulder Press",4,8,25],["Leg Curl",4,10,null,"45/45/10"],["Around the World",4,10,20]]]),
mk("2025-09-22","push","Bench %s Post PR","abike",[["Bench",["Barbell Bench Press",1,10,null,"65%"],["Barbell Bench Press",3,5,null,"85%"],["Barbell Bench Press",2,8,null,"failure 75%"]],["Circuit 1",["Ground to Overhead",4,10,35],["Incline Curl",4,9,30],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Leg Extension",4,10,null,"2-45/10"],["DB Leaning Lateral Raise",4,10,20,"each"],["Cable Tricep Extension",4,10,85]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
mk("2025-09-29","push","Bench Ramp 195","abike",[["Bench",["Barbell Bench Press",1,8,150],["Barbell Bench Press",1,8,165],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,3,195]],["Circuit 1",["Incline Curl",4,5,null],["Incline Hammer Curl",4,5,null],["Cable Tricep Extension",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,8,null],["Lateral Raise",4,10,null],["Walking Lunge",4,10,null,"out & back"]],["Circuit 3",["Leg Curl",4,10,null],["Push Up",4,10,null],["KB Calf Raise",4,10,null,"red"]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]]]),
// Oct 2025: Max 240
mk("2025-10-06","push","Bench Pause + Chimera","abike",[["Bench",["Barbell Bench Press",1,8,150,"1/2 pause"],["Barbell Bench Press",2,6,165],["Barbell Bench Press",2,6,175]],["Circuit 1",["Leg Extension",4,10,null,"2-45 plates"],["DB Bent Over Row Into RDL",4,10,45,"wider stance"]],["Circuit 2",["Hamstring Curl",4,10,null,"2-45 plates"],["Goblet Squat",4,10,35,"rotational, total"]],["Circuit 3",["DB Bicep Curl",4,6,40],["Kneeling Lat Pulldown",4,8,45,"each"]]]),
mk("2025-10-20","push","Bench %s Max 240","abike",[["Bench",["Barbell Bench Press",1,10,156,"65%"],["Barbell Bench Press",3,5,204,"85%"],["Barbell Bench Press",2,8,180,"failure 75%"]],["Circuit 1",["Ground to Overhead",4,8,35],["Incline Curl",4,9,30],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Leg Extension",4,10,null,"2-45/10"],["DB Leaning Lateral Raise",4,10,20,"each"],["Cable Tricep Extension",4,10,85]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
mk("2025-10-27","push","Bench Ramp + Zottman","abike",[["Bench",["Barbell Bench Press",1,8,150],["Barbell Bench Press",1,8,165],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,3,195]],["Circuit 1",["Leg Extension",4,8,null,"tempo, 2-45"],["KB Sumo Squat 1.5",4,10,null,"red"],["Wall Sit Hold",4,1,null,"30sec"]],["Core",["Demon Crunch on Box",3,10,25,"plate"],["DB Side Crunch",3,10,null,"purple, each"]],["Circuit 2",["Zottman Curl",4,8,30],["Leg Curl",4,8,null,"tempo, 2-45"],["Banded Tricep Kickback",4,10,null,"black, each"]],["Circuit 3",["DB Squat to Curtsy Lunge",4,8,20,"each"],["KB Elevated Calf Raise",4,10,null]]]),
// Nov 2025: Max 240→245
mk("2025-11-03","push","Bench Ramp + Incline Curls","abike",[["Bench",["Barbell Bench Press",1,8,150],["Barbell Bench Press",1,8,165],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,3,195]],["Circuit 1",["Incline Curl",4,5,null],["Incline Hammer Curl",4,5,null],["Cable Tricep Extension",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,8,null],["Lateral Raise",4,10,null],["Walking Lunge",4,10,null,"out & back"]],["Circuit 3",["Leg Curl",4,10,null],["Push Up",4,10,null],["KB Calf Raise",4,10,null,"red"]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]]]),
mk("2025-11-10","push","Bench %s + Devil Press","abike",[["Bench",["Barbell Bench Press",1,10,156,"65%"],["Barbell Bench Press",2,5,204,"85%"],["Barbell Bench Press",2,8,180,"failure 75%"]],["Circuit 1",["Devil Press",4,8,30],["Leg Curl",4,10,null,"2-45/15"],["Diagonal Tricep Extension",4,10,null]],["Circuit 2",["Banded Glute Bridge Lat Pullover",4,10,null],["Banded Glute Bridge Abductor Pulse",4,20,null]],["Circuit 3",["DB Bicep Curl",4,10,25],["Leg Extension",4,10,null,"2-45/15"],["Plate Front Raise Press",4,10,35]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Single Leg Calf Raise",1,10,null,"each"]]]),
mk("2025-11-17","push","Bench PR 245","abike",[["Bench",["Barbell Bench Press",1,8,156,"65%"],["Barbell Bench Press",1,3,204,"85%"],["Barbell Bench Press",1,3,240,"100%"],["Barbell Bench Press",1,1,245,"PR"]],["Circuit 1",["Barbell Curl",4,8,null,"10/2.5 plates"],["Cable Crunch Hold",4,10,80],["Bench Dip",4,10,45]],["Circuit 2",["Sled Drag",4,1,null,"5 plates"],["Single Leg Calf Raise",4,10,null]],["Circuit 3",["Seated Shoulder Press",4,8,25],["Leg Curl",4,10,null,"45/45/10"],["Around the World",4,10,20]]]),
mk("2025-11-24","push","Bench PR Repeat 245","abike",[["Bench",["Barbell Bench Press",1,8,156,"65%"],["Barbell Bench Press",1,3,204,"85%"],["Barbell Bench Press",1,3,240,"100%"],["Barbell Bench Press",1,1,245,"PR"]],["Circuit 1",["Leg Extension",4,10,null,"2-45 plates"],["DB Bent Over Row Into RDL",4,10,45,"wider stance"]],["Circuit 2",["Hamstring Curl",4,10,null,"2-45 plates"],["Goblet Squat",4,10,35,"rotational, total"]],["Circuit 3",["Barbell Curl",4,10,null,"10/2.5 plates"],["Kneeling Lat Pulldown",4,8,45,"each"]]]),
// Dec 2025: Max 245
mk("2025-12-01","push","Bench Ramp 205 + Zottman","abike",[["Bench",["Barbell Bench Press",1,10,165],["Barbell Bench Press",1,8,175],["Barbell Bench Press",1,8,185],["Barbell Bench Press",1,5,195],["Barbell Bench Press",1,5,205]],["Circuit 1",["Single Leg Extension",4,8,null,"45+10"],["KB Sumo Squat 1.5",4,10,null,"red"],["Wall Sit Hold",4,1,null,"30sec"]],["Core",["Demon Crunch on Box",3,10,25,"plate"],["DB Side Crunch",3,10,null,"purple, each"]],["Circuit 2",["Zottman Curl",4,8,30],["Single Leg Curl",4,8,null,"2-45+10"],["Banded Tricep Kickback",4,10,null,"black, each"]],["Circuit 3",["DB Squat to Curtsy Lunge",4,8,20,"each"],["KB Elevated Calf Raise",4,10,null]]]),
mk("2025-12-08","push","Bench 205 + Back Squat","abike",[["Bench",["Barbell Bench Press",1,10,165],["Barbell Bench Press",1,8,175],["Barbell Bench Press",1,8,185],["Barbell Bench Press",1,5,195],["Barbell Bench Press",1,5,205]],["Circuit 1",["DB ISO Hold Bicep Curl",1,10,35],["Seated Push Press",1,8,40],["Cable Tricep Extension",1,12,90]],["Circuit 2",["Barbell Back Squat",4,8,185],["BW Jump Squat",4,15,null],["Bent Knee Calf Raise",4,15,null]],["Finisher",["Push Up",3,1,null,"to failure, 1min rest"]]]),
mk("2025-12-15","push","Bench PR 245 + Lat Pullover","abike",[["Bench",["Barbell Bench Press",1,8,156,"65%"],["Barbell Bench Press",1,3,204,"85%"],["Barbell Bench Press",1,3,240,"100%"],["Barbell Bench Press",1,1,245,"PR"]],["Circuit 1",["Incline Curl",4,5,35],["Incline Hammer Curl",4,5,35],["Cable Lat Pullover",4,10,60,"each"]],["Circuit 2",["Leg Extension",4,10,null,"2-45"],["Bench Dip",4,10,null],["Sandbag Walking Lunge",4,1,null,"DnB"]],["Circuit 3",["Leg Curl",4,10,null],["DB Deadlift to Calf Raise",4,8,35],["Cable Crunch",4,10,100,"slow"]]]),
mk("2025-12-22","push","Bench %s Max 245","abike",[["Bench",["Barbell Bench Press",1,10,160,"65%"],["Barbell Bench Press",3,5,210,"85%"],["Barbell Bench Press",2,8,185,"failure 75%"]],["Circuit 1",["DB Thruster",4,10,30],["Barbell Curl",4,10,null,"10/2.5"],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Leg Extension",4,10,null,"2-45/10"],["DB Leaning Lateral Raise",4,10,20,"each"],["Cable Tricep Extension",4,10,85]],["Finisher",["Sled Drag",1,1,null,"5 plates"],["Push Up",1,10,null]]]),
mk("2025-12-29","push","Bench Ramp 205 + Sled","abike",[["Bench",["Barbell Bench Press",1,8,160],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,4,195],["Barbell Bench Press",1,4,205]],["Circuit 1",["Incline Curl",4,6,30],["Incline Hammer Curl",4,6,30],["Cable Tricep Extension",4,8,null,"each"]],["Circuit 2",["Sled Push/Drag",4,1,null,"4 plates"],["Push Up",4,10,null]],["Circuit 3",["Leg Curl",4,10,null],["Cable Lat Pull Down",4,1,null,"each"],["Bent Knee Calf Raise",4,10,null]]]),
mk("2025-12-30","push","Push-Pull Day","abike",[["Bench",["Barbell Bench Press",1,8,115,"2sec pause"],["Barbell Bench Press",1,8,135],["Barbell Bench Press",2,8,140],["Bench Dip",4,15,null]],["Circuit 1",["DB T Raise",4,10,15],["8-8-8 Bicep Curl",4,1,20]],["Circuit 2",["Renegade Row",4,10,25,"with push up"],["Cable Tricep Extension",4,12,80]],["Core",["Russian Twist",3,20,null],["Weighted Situp",3,15,null]]]),
// Jan 2026: Max 245
mk("2026-01-05","push","Bench %s + KB Clean","abike",[["Bench",["Barbell Bench Press",1,10,160,"65%"],["Barbell Bench Press",3,5,210,"85%"],["Barbell Bench Press",2,8,185,"failure 75%"]],["Circuit 1",["KB Clean & Squat",4,10,null,"green"],["Barbell Curl",4,6,80],["Leg Curl",4,10,null,"2-45/10"]],["Circuit 2",["Sled Push/Drag",4,1,null,"5 plates, squat fold to stand"],["DB Leaning Lateral Raise",4,10,20,"each"],["Cable Tricep Extension",4,10,85]],["Finisher",["Push Up",1,10,null],["KB Calf Raise",1,10,null]]]),
mk("2026-01-12","push","Bench Ramp 205 + Bulgarian","abike",[["Bench",["Barbell Bench Press",1,8,160],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,4,195],["Barbell Bench Press",1,4,205]],["Circuit 1",["DB Bulgarian Split Squat",4,7,null],["Bulgarian Split Squat",4,7,null,"BW"],["Calf Raise",4,7,null]],["Circuit 2",["DB Bicep Curl",4,10,25],["Barbell RDL",4,8,125],["Diagonal Tricep Extension",4,10,null]],["Circuit 3",["Banded Glute Bridge Lat Pullover",4,10,null],["Banded Glute Bridge Abductor Pulse",4,20,null]],["Finisher",["Cardio",3,2,null,"legs/both/arms"]]]),
mk("2026-01-19","push","Bench Drop Sets 205","abike",[["Bench",["Barbell Bench Press",1,8,160],["Barbell Bench Press",1,5,205],["Barbell Bench Press",1,5,195],["Barbell Bench Press",1,7,185],["Barbell Bench Press",1,7,175]],["Circuit 1",["Barbell Curl",4,6,80],["Leg Curl",4,10,null,"2-45/10"],["Lateral Raise",4,8,20]],["Circuit 2",["Sled Push/Drag",4,1,null,"5 plates"]],["Finisher",["Push Up",1,10,null],["KB Calf Raise",1,10,null],["Cable Tricep Extension",1,10,85]]]),
mk("2026-01-26","push","Bench Drop Sets 215","abike",[["Bench",["Barbell Bench Press",1,8,175],["Barbell Bench Press",1,4,215],["Barbell Bench Press",1,4,205],["Barbell Bench Press",1,5,195],["Barbell Bench Press",1,6,185]],["Circuit 1",["Barbell Curl",4,6,80],["Leg Curl",4,10,null,"2-45/10"],["Cable Tricep Extension",4,10,85]],["Circuit 2",["Cardio",4,1,null,"30sec"],["Walking Lunge",4,10,25],["KB Calf Raise",4,10,null]],["Finisher",["Push Up",3,1,null,"to failure"]]]),
// Feb 2026
mk("2026-02-09","push","Bench Ramp 205 + Sled","abike",[["Bench",["Barbell Bench Press",1,8,160],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,4,195],["Barbell Bench Press",1,4,205]],["Circuit 1",["Sled Push/Drag",4,1,null,"4 plates"],["Barbell RDL",4,6,null,"35s"]],["Circuit 2",["Incline Hammer Curl",4,1,null],["DB Incline Chest Press",4,6,35],["Leg Extension",4,10,null,"2-45"],["Cable Tricep Extension",4,10,null]],["Circuit 3",["Cable Lat Pull Down",4,1,null,"each"],["Bent Knee Calf Raise",4,10,null]]]),
mk("2026-02-16","push","Bench Ramp 205 + Curls","abike",[["Bench",["Barbell Bench Press",1,8,160],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,185],["Barbell Bench Press",1,4,195],["Barbell Bench Press",1,4,205]],["Circuit 1",["Barbell Curl",4,6,75],["KB Suitcase Deadlift",4,8,null,"reds"],["Cable Tricep Extension",4,8,null,"each"]],["Circuit 2",["Leg Extension",4,8,null],["Cable Lat Pull Down",4,10,null],["Walking Lunge",4,10,25]],["Circuit 3",["Leg Curl",4,10,null],["Push Up",4,10,null],["KB Calf Raise",4,10,null,"red"]],["Core",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]]]),
];

const SEED_DEANNA=[
// Aug 2025: Start - full body, light weights, building foundation
mk("2025-08-19","full","Full Body Intro","abike",[["Circuit 1",["Incline Push Up",3,10,null],["KB Squat to High Pull",3,10,null,"pink"],["Bench Dip",3,8,null]],["Core",["Weighted Deadbug",3,10,10],["Russian Twist",3,20,null]],["Circuit 2",["DB Bicep Curl",3,8,10,"10-12"],["KB Sumo Squat",3,8,null,"blue"],["Farmer Carry",3,1,null,"DnB"]],["Finisher",["Cardio",3,1,null,"1min"],["Medball Slam",3,10,null,"10 & 20"]]]),
mk("2025-08-21","full","Full Body Class","abike",[["Circuit 1",["DB Push Press",4,8,null],["Goblet Squat",4,8,null],["DB Front Raise",4,8,null]],["Circuit 2",["Hammer Curl",4,8,null],["Box Step Up",4,8,null,"each"],["Banded Tricep Pushdown",4,10,null]],["Finisher",["Ski Erg",4,10,null,"cal"],["KB High Pull",4,10,null]]]),
mk("2025-08-26","full","Full Body + Ski","abike",[["Core",["Plate March",3,10,null],["Plate Halo",3,10,null]],["Circuit 1",["KB Curl",4,10,null,"blue"],["Leg Extension",4,10,null,"each"],["Diagonal Tricep Extension",4,10,null,"each"]],["Circuit 2",["DB Chest Press",4,8,null],["Lateral Raise",4,8,null,"seated"],["Leg Curl",4,8,null]],["Finisher",["Ski Erg",4,10,null,"cal"],["KB Squat to High Pull",4,10,null,"pink/blue"]]]),
mk("2025-08-28","full","Full Body + Row","abike",[["Circuit 1",["Cable Row",4,10,null],["Goblet Squat",4,10,25],["Incline Push Up",4,10,null]],["Circuit 2",["Zottman Curl",4,8,12],["DB Lunge Pulse",4,10,10,"each"],["Cable Tricep Extension",4,10,null]],["Core",["Weighted Deadbug",4,20,8],["Heel Taps",4,20,null]],["Finisher",["Row Erg",3,1,null,"1min"],["KB High Pull",3,8,null,"blue"],["KB Curl",3,8,null,"blue"]]]),
// Sep 2025: Twice weekly, building structure
mk("2025-09-02","full","Full Body Light","abike",[["Circuit 1",["7-7-7 Curl",4,1,12],["Leg Curl",4,10,null,"45 plate"],["Cable Row",4,10,45]],["Circuit 2",["Seated Push Press",3,10,10],["Leg Extension",3,10,null,"45 plate"],["Cable Tricep Extension",3,10,35]],["Core",["Alt Bird Dog",3,10,null],["Side Crunch",3,10,null,"blue"]],["Finisher",["Row Erg",1,1,null,null]]]),
mk("2025-09-04","full","Full Body + Gorilla Row","abike",[["Circuit 1",["Plate Overhead Press",4,10,35],["Goblet Squat",4,10,null,"blue"],["Plate Front Raise",4,10,15]],["Circuit 2",["7-7-7 Curl",4,1,12],["Leg Extension",4,10,null,"45/10"],["DB Row",4,10,30]],["Circuit 3",["Incline Push Up",4,10,10],["Leg Curl",4,10,null,"45/10"],["DB Side Crunch",4,10,null,"yellow, each"]],["Core",["Banded Glute Bridge Lat Pullover",3,10,null],["Banded Adductor Pulse",3,20,null]],["Finisher",["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,null,"blues DnB"],["KB Calf Raise",3,10,null,"blue"]]]),
mk("2025-09-09","full","Full Body Iso Curls","abike",[["Circuit 1",["DB ISO Hold Bicep Curl",4,1,12],["Leg Curl",4,10,null,"45 plate"],["Cable Row",4,10,45]],["Circuit 2",["Seated Push Press",3,10,10],["Leg Extension",3,10,null,"45 plate"],["Cable Tricep Extension",3,10,35]],["Core",["Alt Bird Dog",3,10,null],["Side Crunch",3,10,null,"blue"]],["Finisher",["Row Erg",1,1,null,null]]]),
mk("2025-09-11","full","Full Body + Bench Dips","abike",[["Circuit 1",["Incline Push Up",4,10,null],["KB Squat to High Pull",4,10,null,"blue"],["Bench Dip",4,10,null]],["Core",["Weighted Deadbug",3,10,10],["Russian Twist",3,20,null]],["Circuit 2",["Incline Hammer Curl",4,8,15],["Leg Extension",4,10,null,"45/10"],["Farmer Carry",4,1,null,"DnB"]],["Finisher",["Cardio",3,1,null,"arms only 1min"],["Leg Curl",3,10,null,"45/10"]]]),
mk("2025-09-16","full","Full Body + Sled","abike",[["Circuit 1",["Plate Overhead Press",4,10,25],["Banded Sissy Squat",4,10,null],["Barbell Row",4,10,null]],["Circuit 2",["Barbell Curl",4,1,null,"10/2.5"],["Leg Extension",4,10,null,"45/10/5"],["Cable Tricep Extension",4,10,30]],["Circuit 3",["Incline Push Up",4,10,null],["Leg Curl",4,10,null,"45/10"],["DB Side Crunch",4,10,null,"yellow, each"]],["Core",["Banded Glute Bridge Lat Pullover",3,10,null],["Banded Adductor Pulse",3,20,null]],["Finisher",["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,null,"blues DnB"],["KB Calf Raise",3,10,null,"blue"]]]),
mk("2025-09-18","full","Full Body Bench Press","abike",[["Circuit 1",["Barbell Bench Press",4,10,45,"bar only"],["KB Sumo Squat",4,10,null,"yellow"],["Cable Lat Pull Down",4,10,null]],["Circuit 2",["Incline Hammer Curl",4,1,12],["Leg Extension",4,10,null,"45/10"],["DB Row",4,10,30]],["Circuit 3",["Leg Curl",4,10,null,"45/10"],["Medball Slam",4,10,20],["Diagonal Tricep Extension",4,10,null,"each"]]]),
mk("2025-09-23","full","Full Body + Yoga Ball","abike",[["Circuit 1",["Plate Overhead Press",4,10,25],["Yoga Ball Squat",4,10,null],["Gorilla Row",4,10,null,"pink"]],["Circuit 2",["Barbell Curl",4,1,null,"10/2.5"],["Leg Extension",4,10,null,"45/10/5"],["Diagonal Tricep Extension",4,10,30]],["Circuit 3",["Incline Push Up",4,10,null],["Leg Curl",4,10,null,"45/10/5"],["DB Side Crunch",4,10,null,"yellow, each"]],["Core",["Banded Glute Bridge Lat Pullover",3,10,null],["Banded Adductor Pulse",3,20,null]],["Finisher",["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,null,"blues DnB"],["KB Calf Raise",3,10,null,"blue"]]]),
// Oct 2025: Progressing
mk("2025-10-14","full","Full Body Light","abike",[["Circuit 1",["7-7-7 Curl",4,1,12],["Leg Curl",4,10,null,"45 plate"],["Cable Row",4,10,45]],["Circuit 2",["Seated Push Press",3,10,10],["Leg Extension",3,10,null,"45 plate"],["Cable Tricep Extension",3,10,35]],["Core",["Alt Bird Dog",3,10,null],["Side Crunch",3,10,null,"blue"]],["Finisher",["Row Erg",1,1,null,null]]]),
mk("2025-10-16","full","Full Body Scap Work","abike",[["Scap Work",["Band Scap Abduction",3,10,null],["Band Scap Abduction",3,10,null],["Band Y/T/W",3,10,null,"each"]],["Circuit 1",["Incline Hammer Curl",4,10,12,"12-15"],["Sumo Squat",4,10,null,"yellow"],["Cable Face Pull",4,10,40]],["Core",["Banded Glute Bridge",3,10,null],["Banded Glute Bridge Abductor Pulse",3,20,null]],["Circuit 2",["DB Crush Grip Press",4,10,10],["Farmer Carry",4,1,null,"browns DnB"],["Calf Raise",4,10,null]]]),
mk("2025-10-21","full","Full Body Tempo Lunge","abike",[["Scap Work",["Band Scap Abduction",3,10,null],["Band Y/T/W",3,10,null,"each"]],["Circuit 1",["DB ISO Hold Bicep Curl",4,1,12],["Leg Curl",4,10,null,"45 plate"],["Cable Tricep Extension",4,10,35]],["Circuit 2",["Leg Extension",3,10,null,"45 plate"],["Cable Lat Pull Down",3,10,30],["Split Stance Lunge",3,8,null,"each"]],["Core",["Alt Bird Dog",3,10,null],["Heel Taps",3,20,null]]]),
mk("2025-10-23","full","Full Body Crush Press","abike",[["Circuit 1",["DB Crush Grip Press",4,10,15],["KB Sumo Squat",4,10,null,"yellow"],["Cable Crunch Hold",4,10,null]],["Circuit 2",["Incline Hammer Curl",4,1,15],["Leg Extension",4,10,null,"45/10"],["DB Row",4,10,30]],["Circuit 3",["Leg Curl",4,10,null,"45/10"],["Plate Front Raise",4,10,20],["Cable Tricep Extension",4,10,null,"each"]]]),
mk("2025-10-30","full","Full Body Gorilla Row","abike",[["Circuit 1",["Plate Overhead Press",4,10,25],["Banded Sissy Squat",4,10,null],["Gorilla Row",4,10,null,"blue"]],["Circuit 2",["Barbell Curl",4,1,null,"10/2.5"],["Leg Extension",4,10,null,"45/10/5"],["Cable Tricep Extension",4,10,40]],["Circuit 3",["Cable Lat Pull Down",4,10,null],["Leg Curl",4,10,null,"45/10/5"],["DB Side Crunch",4,10,null,"yellow, each"]],["Core",["Banded Glute Bridge",1,10,null],["Banded Adductor Pulse",1,20,null]],["Finisher",["Row Erg",3,1,null,"200m"],["KB High Pull",3,10,null,"blue"]]]),
// Nov 2025
mk("2025-11-04","full","Full Body + Bike Intervals","abike",[["Circuit 1",["Incline Push Up",4,10,null],["KB Squat to High Pull",4,10,null,"blue"],["Diagonal Tricep Extension",4,10,null,"each"]],["Core",["Dead Bug",3,10,null],["Russian Twist",3,20,null]],["Circuit 2",["Incline Hammer Curl",4,8,12,"12-15"],["Leg Extension",4,10,null,"45/15"],["Lateral Raise",4,10,8,"thumbs up, 8-10"]],["Circuit 3",["Cardio",4,1,null,"30sec legs/30sec arms"],["Leg Curl",4,10,null,"45/25"]]]),
mk("2025-11-06","full","Full Body Sled + Ski","abike",[["Circuit 1",["Incline Hammer Curl",4,10,12,"12-15"],["DB Incline Crush Grip Press",4,10,15],["Cable Face Pull",4,10,40,"seated"]],["Core",["Banded Glute Bridge",3,10,null],["Banded Glute Bridge Abductor Pulse",3,20,null]],["Circuit 2",["Sled Drag",3,1,null,"2 plates DnB"],["Calf Raise",3,10,null]],["Finisher",["Ski Erg",3,10,null,"cal"],["KB High Pull",3,10,null,"blue"]]]),
mk("2025-11-21","full","Full Body Incline PU","abike",[["Scap Work",["Band Scap Abduction",3,10,null],["Band Y/T/W",3,10,null,"on bench, each"]],["Circuit 1",["Leg Curl",4,10,null,"45/10/5"],["Incline Push Up",4,10,null],["Sumo Squat",4,8,null,"purple"]],["Core",["Plate Crunch",1,10,null],["Hollow Hold",1,20,null,"sec"]],["Circuit 2",["Barbell Curl",4,1,null,"10/2.5"],["Leg Extension",4,10,null,"45/10/5"],["Cable Tricep Extension",4,10,40]]]),
// Dec 2025
mk("2025-12-04","full","Full Body OH Press","abike",[["Circuit 1",["Plate Overhead Press",4,10,25],["Goblet Squat",4,10,null],["Gorilla Row",4,10,null,"blue"]],["Circuit 2",["Barbell Curl",4,1,null,"10/2.5"],["Leg Extension",4,10,null,"45/10/5"],["Cable Tricep Extension",4,10,40,"each"]],["Circuit 3",["Cable Lat Pull Down",4,10,null],["Leg Curl",4,10,null,"45/10/5"],["DB Side Crunch",4,10,null,"yellow, each"]],["Core",["Banded Glute Bridge",1,10,null],["Banded Adductor Pulse",1,20,null]],["Finisher",["Row Erg",3,1,null,"200m"],["KB High Pull",3,10,null,"blue"]]]),
mk("2025-12-09","lower","Lower Body Sled","abike",[["Circuit 1",["Sled Drag",4,1,null,"2 plates DnB"],["Assisted Bent Leg Calf Raise",4,12,null]],["Circuit 2",["Leg Extension",4,10,null,"45/10"],["Barbell RDL",4,8,null,"15s"]],["Core",["Banded Glute Bridge March",3,10,null],["Banded Glute Bridge Adductor Pulse",3,12,null]],["Circuit 3",["Leg Curl",4,10,null,"45/15"],["Step Down",4,8,null,"each, slow & controlled"]],["Finisher",["Cardio",1,2,null,"1.5min choice"],["Medball Slam",1,10,20]]]),
mk("2025-12-11","upper","Upper Shoulder Rehab","abike",[["Scap Work",["Band Shoulder Stretch",1,1,null],["Scap Push Up",1,1,null]],["Circuit 1",["DB Crush Grip Press",4,8,10],["DB Chest Fly",4,8,10],["Seated DB Reverse Fly",4,8,10,"elbows"]],["Circuit 2",["Banded Tricep Kickback",4,10,null,"each"],["Cable Lat Pull Down",4,10,40],["Cable Face Pull",4,10,null]],["Core",["Ab Rollout",1,10,null],["Side Plank Hip Dip",1,10,null,"each"],["Low Plank Hold",1,10,null]],["Circuit 3",["Cable Row",4,10,30,"neutral grip"],["Band Y/T/W",4,10,null,"blue"]],["Finisher",["Row Erg",1,1,null,null]]]),
mk("2025-12-16","lower","Lower Body HT + Sled","abike",[["Main",["Hip Thruster",4,8,95]],["Core",["Flutter Kick",4,20,null],["Hollow Hold",4,20,null,"sec"],["Heel Taps",4,20,null]],["Circuit 1",["Hamstring Curl",4,8,null,"45/25/10"],["Deficit Sumo Squat",4,8,45]],["Circuit 2",["Sled Drag",3,1,null,"3 plates DnB"],["Calf Raise",3,10,null,"yellows"]],["Circuit 3",["Leg Extension",4,8,null,"45/25"],["Squat Hold Step Back",4,20,null]]]),
mk("2025-12-30","upper","Upper Shoulder Rehab 2","abike",[["Scap Work",["Band Scap Abduction",3,10,null],["Scap Push Up",3,10,null,"wall, blue band"],["Band Y/T/W",3,10,null]],["Circuit 1",["DB ISO Hold Bicep Curl",4,1,null],["Walking Lunge",4,10,10,"10 out/back"],["Cable Tricep Extension",4,15,30,"each"]],["Circuit 2",["Cable Lat Pull Down",4,10,null,"low weight"],["Farmer Carry",4,1,null,"yellows"],["Cable Row",4,10,null,"wall ball"]],["Core",["Alt Bird Dog",1,10,null,"each"],["Leg Lift",1,10,null]],["Finisher",["Row Erg",1,1,null,"200m"],["Scap Dip",1,1,null]]]),
// Jan 2026
mk("2026-01-06","lower","Lower Body Sled + Steps","abike",[["Circuit 1",["Sled Drag",4,1,null,"2 plates DnB"],["Assisted Bent Leg Calf Raise",4,12,null]],["Circuit 2",["Leg Extension",4,10,null,"45/15"],["Barbell RDL",4,8,null,"15s"]],["Core",["Banded Glute Bridge March",3,10,null],["Banded Clamshell",3,10,null,"each"]],["Circuit 3",["Leg Curl",4,10,null,"45/15"],["Rig Assisted Step Down",4,8,null,"each, slow toe tap"]],["Finisher",["Row Erg",1,1,null,"1min"],["Medball Slam",1,10,20]]]),
mk("2026-01-13","lower","Lower Body Trap Bar","abike",[["Circuit 1",["Trap Bar Deadlift",4,8,null,"25 plates"],["Calf Raise",4,10,null,"yellow"]],["Core",["Cable Crunch Hold",3,10,null],["DB Side Crunch",3,10,null,"yellow"]],["Circuit 2",["Leg Extension",4,8,null,"45/15, 2sec pause"],["KB Sumo Squat Pulse",4,20,null]],["Circuit 3",["Hamstring Curl",4,10,null,"45/25, 2sec pause"],["Step Down Toe Tap",4,10,null,"each, slow"]],["Finisher",["Cardio",3,2,null,"1.5min"],["Medball Slam",3,10,null]]]),
mk("2026-01-15","upper","Upper Shoulder Rehab 3","abike",[["Scap Work",["Scap Push Up",4,10,null,"wall"],["Band Scap Abduction",4,10,null],["Band Pull Apart",4,10,null]],["Circuit 1",["Band Y/T/W",3,10,null,"each"]],["Circuit 2",["DB ISO Hold Bicep Curl",4,1,null],["Leg Extension",4,10,null,"45/25"],["Cable Row",4,10,null]],["Circuit 3",["Cable Lat Pull Down",4,10,null,"low weight"],["Leg Curl",4,10,null,"45/25"],["Banded Tricep Extension",4,15,30]],["Core",["Cable Crunch",1,16,null],["Farmer Carry",1,20,null,"pink"]],["Finisher",["Row Erg",1,1,null,"200m"],["Medball Slam",1,10,null]]]),
mk("2026-01-20","lower","Lower Body Sled + Steps 2","abike",[["Circuit 1",["Sled Drag",4,1,null,"2+25 DnB"],["Assisted Bent Leg Calf Raise",4,12,null]],["Circuit 2",["Leg Extension",4,10,null,"45/15"],["Barbell RDL",4,8,null,"15s"]],["Core",["Band Curl",3,10,null],["Banded Glute Bridge March",3,10,null],["Banded Glute Bridge Adductor Slow Down",3,10,null]],["Circuit 3",["Step Up",4,7,null,"each"],["Step Down",4,7,null,"each"]],["Finisher",["Cardio",1,1,null,null]]]),
mk("2026-01-27","lower","Lower Body Trap Bar 2","abike",[["Circuit 1",["Trap Bar Deadlift",4,8,null,"25 plates"],["Bent Knee Calf Raise",4,10,null],["Cable Crunch Hold",4,10,null]],["Circuit 2",["Single Leg Extension",4,8,null,"25/5"],["KB Sumo Squat 1.5",4,8,null]],["Circuit 3",["Single Leg Curl",4,8,null,"25/10, each"],["BW Curtsy Lunge",4,8,null,"each"]],["Finisher",["Cardio",1,1,null,"AMRAP"],["Medball Slam",1,10,null]]]),
mk("2026-01-29","upper","Upper Shoulder Rehab 4","abike",[["Scap Work",["Band Shoulder Capsule Stretch",1,1,null],["Band Shoulder Circle",1,1,null]],["Circuit 1",["Banded Chest Press",4,10,null,"thin red"],["Band Pull Apart",4,10,null],["Scap Push Up",4,10,null,"elbows & knees"]],["Circuit 2",["DB ISO Hold Bicep Curl",4,1,null],["Cable Row",4,10,45],["Banded Tricep Extension",4,10,null]],["Finisher",["Row Erg",4,1,null,"200m"],["Cable Crunch",4,10,null],["KB High Pull",4,8,null,"pink"]]]),
// Feb 2026
mk("2026-02-12","full","Full Body Band + Cable","abike",[["Scap Work",["Band Shoulder Stretch",1,1,null],["Band Shoulder Circle",1,1,null]],["Circuit 1",["Banded Chest Press",4,10,null,"thin red"],["Band Pull Apart",4,10,null],["Scap Push Up",4,10,null,"elbows & knees"]],["Circuit 2",["Leg Curl",4,10,null,"45/10/5"],["Cable Row",4,10,null],["Sumo Squat",4,10,null,"purple"]],["Core",["Cable Crunch Hold",1,10,null,"2sec hold"],["Low Plank Hold",1,30,null,"sec"]],["Circuit 3",["Band Curl",4,10,null],["Leg Extension",4,10,null,"45/10/5"],["Cable Tricep Extension",4,10,40]],["Finisher",["Cardio",1,1,null,null]]]),
mk("2026-02-19","lower","Lower Body HT + Sumo","abike",[["Main",["Hip Thruster",4,8,95]],["Circuit 1",["Leg Extension",4,8,null,"45/25"],["Calf Raise",4,10,null,"plate, each"]],["Core",["Knee Tuck on Box",4,10,null],["Hip Flexor",4,8,null,"each"],["Banded Abductor",4,10,null,"each"]],["Circuit 2",["Hamstring Curl",4,8,null,"45/25/10"],["Sumo Squat Pulse",4,20,null,"purple"]]]),
];

const SEED_KERIE=[
  mk("2025-10-03","full","Full Body","3 min bike, PVC, leg band warm up",[["Circuit – 3-4 rds",["Incline Push Up",4,10,null],["KB Squat to High Pull",4,10,15],["Bench Dip",4,8,null]],["Core – 3-4 rds",["Weighted Deadbug",4,10,10],["Russian Twist",4,20,null]],["Circuit – 3-4 rds",["DB Bicep Curl",4,8,10],["KB Sumo Squat",4,8,25],["Farmer Carry",4,2,25]],["Finisher – 3 rds",["Bike",3,1,null],["Medball Slam",3,10,15]]]),
  mk("2025-10-10","full","Full Body","Bike 3 min, class warm up",[["Circuit – 4 rds",["DB Push Press",4,8,null],["Goblet Squat",4,8,null],["Plate Front Raise",4,8,null]],["Core – 3 rds",["Plate Halo",3,10,null],["Side Crunch",3,10,null]],["Circuit – 4 rds",["Hammer Curl",4,10,null],["Split Stance Lunge",4,8,null],["Cable Tricep Extension",4,10,null]],["Finisher – 4 rds",["Ski Erg",4,10,null],["KB High Pull",4,10,null]]]),
  mk("2025-10-17","full","Full Body","Bike 3 min, class warm up",[["Glute Activation – 3 rds",["Banded Glute Bridge",3,10,null],["Banded Abductor Pulse",3,15,null]],["Circuit – 4 rds",["KB Curl to Press",4,8,25],["Leg Extension",4,10,null],["Diagonal Tricep Extension",4,10,null]],["Circuit – 4 rds",["DB Crush Grip Press",4,8,null],["Cable Row",4,10,null],["Leg Curl",4,8,null]],["Finisher – 4 rds",["Row Erg",4,1,null,"150m"],["KB Squat to High Pull",4,10,null]]]),
  mk("2025-10-24","full","Full Body","3 min bike, PVC, leg band warm up",[["Circuit – 4 rds",["Cable Row",4,10,null],["Goblet Squat",4,10,25],["Incline Push Up",4,10,null]],["Circuit – 4 rds",["Zottman Curl",4,8,12],["DB Lunge Pulse",4,10,10],["Cable Tricep Extension",4,10,null]],["Core – 4 rds",["Weighted Deadbug",4,20,8],["Heel Taps",4,20,null]],["Finisher – 3-4 rds",["Row Erg",4,1,null,"1 min"],["KB High Pull",4,8,25],["KB Curl",4,8,25]]]),
  mk("2025-11-21","full","Full Body","3 min bike, PVC, leg band warm up",[["Circuit – 3-4 rds",["Incline Push Up",4,10,null],["KB Squat to High Pull",4,10,15],["Bench Dip",4,8,null]],["Core – 3-4 rds",["Weighted Deadbug",4,10,10],["Russian Twist",4,20,null]],["Circuit – 3-4 rds",["DB Bicep Curl",4,8,10],["KB Sumo Squat",4,8,25],["Farmer Carry",4,2,25]],["Finisher – 3 rds",["Bike",3,1,null],["Medball Slam",3,10,15]]]),
  mk("2025-12-05","full","Full Body","Bike 3 min, PVC, leg band warm up",[["Circuit – 4 rds",["Plate Overhead Press",4,10,35],["Goblet Squat",4,10,25],["Plate Front Raise",4,10,15]],["Circuit – 4 rds",["7-7-7 Curl",4,21,12],["Leg Extension",4,10,55],["Single Arm Row",4,10,30]],["Circuit – 4 rds",["Incline Push Up",4,10,10],["Leg Curl",4,10,55],["DB Side Crunch",4,10,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,25],["KB Calf Raise",3,10,25]]]),
  mk("2025-12-08","full","Full Body","3 min bike, band upper + lower warm up",[["Circuit – 4 rds",["Hammer Curl",4,10,12],["Leg Extension",4,10,45],["Cable Row",4,10,45]],["Circuit – 3 rds",["Leg Curl",3,10,45],["Cable Tricep Extension",3,10,35],["Split Stance Lunge",3,10,null]],["Core – 3 rds",["Alt Bird Dog",3,10,null],["Russian Twist",3,20,10]]]),
  mk("2025-12-12","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["7-7-7 Curl",4,21,10],["Single Arm Row",4,10,25],["Banded Tricep Kickback",4,10,null]],["Core – 3 rds",["Plate Halo",3,10,10],["Plate March",3,20,null],["DB Side Crunch",3,10,15]],["Circuit – 4 rds",["DB Crush Grip Press",4,10,10],["Cable Row",4,10,null],["Around the World",4,10,8]],["Finisher – 3 rds",["Ski Erg",3,10,null],["KB High Pull",3,10,15]]]),
  mk("2025-12-22","full","Full Body","3 min bike, PVC, leg band warm up",[["Circuit – 4 rds",["Incline Push Up",4,10,null],["KB Sumo Squat",4,10,35],["KB High Pull",4,10,25]],["Core – 3 rds",["Weighted Deadbug",3,10,5],["Russian Twist",3,20,15]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,15],["Leg Extension",4,10,55],["Farmer Carry",4,2,null]],["Finisher – 3 rds",["Bike",3,1,null],["Leg Curl",3,10,55]]]),
  mk("2025-12-29","full","Full Body","Bike 3 min, PVC, leg band warm up",[["Circuit – 4 rds",["Plate Overhead Press",4,10,25],["Banded Sissy Squat",4,10,null],["Barbell Row",4,10,null]],["Circuit – 4 rds",["Barbell Curl",4,10,25],["Leg Extension",4,10,60],["Cable Tricep Extension",4,10,30]],["Circuit – 4 rds",["Incline Push Up",4,10,null],["Leg Curl",4,10,55],["DB Side Crunch",4,10,null]],["Core + Finisher",["Banded Glute Bridge Lat Pullover",3,10,null],["Banded Adductor Pulse",3,20,null],["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,25],["KB Calf Raise",3,10,25]]]),
  mk("2026-01-02","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["DB Bicep Curl",4,10,12],["Barbell Row",4,10,null],["Banded Tricep Kickback",4,10,null]],["Core – 3 rds",["Plate Halo",3,10,10],["Plate March",3,20,null]],["Circuit – 4 rds",["DB Crush Grip Press",4,10,10],["Cable Row",4,10,null],["Around the World",4,10,8]],["Finisher – 3 rds",["Ski Erg",3,10,null],["KB High Pull",3,10,15]]]),
  mk("2026-01-05","full","Full Body","Row 3 min, PVC, leg band warm up",[["Circuit – 4 rds",["Barbell Bench Press",4,10,45],["Goblet Squat",4,10,35],["Cable Crunch",4,10,null]],["Circuit – 4 rds",["Hammer Curl",4,10,12],["Leg Extension",4,10,55],["Single Arm Row",4,10,30]],["Circuit – 4 rds",["Leg Curl",4,10,55],["Medball Slam",4,10,20],["Single Arm Diagonal Tricep Extension",4,10,null]],["Finisher",["Ski Erg",1,12,null,"12 cal"],["Sumo Squat Pulse",1,15,35]]]),
  mk("2026-01-09","upper","Upper","Bike warm up, PVC",[["Circuit – 4 rds",["DB ISO Hold Bicep Curl",4,8,null],["Single Arm Banded Lat Pulldown",4,8,null],["Cable Tricep Extension",4,8,null]],["Core – 3 rds",["Ab Rollout",3,10,null],["Flutter Kick",3,10,null]],["Circuit – 4 rds",["Barbell Row",4,8,null],["Cable Row",4,8,null],["Push Up",4,8,null]],["AMRAP",["Bike",1,1,null,"1 min"],["KB Curl",1,10,25],["KB Curl to Press",1,10,15]]]),
  mk("2026-01-12","full","Full Body","Bike 3 min, PVC, leg band warm up",[["Circuit – 4 rds",["Plate Overhead Press",4,10,25],["Sumo Squat",4,10,35],["Gorilla Row",4,10,25]],["Circuit – 4 rds",["Barbell Curl",4,10,25],["Leg Extension",4,10,60],["Diagonal Tricep Extension",4,10,30]],["Circuit – 4 rds",["Incline Push Up",4,10,null],["Leg Curl",4,10,60],["DB Side Crunch",4,10,null]],["Core + Finisher",["Banded Glute Bridge Lat Pullover",3,10,15],["Banded Adductor Pulse",3,20,null],["Row Erg",3,1,null,"200m"],["Farmer Carry",3,1,25],["KB Calf Raise",3,10,25]]]),
  mk("2026-02-13","full","Full Body","Bike 3 min, PVC, leg band warm up",[["Circuit – 4 rds",["DB Push Press",4,8,10],["Sumo Squat",4,10,35],["Single Arm Row",4,10,20]],["Circuit – 4 rds",["Hammer Curl",4,10,12],["Leg Extension",4,10,60],["Single Arm Tricep Extension",4,10,20]],["Circuit – 4 rds",["Incline Push Up",4,10,null],["Leg Curl",4,10,60],["DB Side Crunch",4,10,null]],["Core + Finisher",["Banded Glute Bridge",3,10,null],["Banded Glute Bridge March",3,10,null],["Banded Adductor Pulse",3,20,null],["Bike",3,1,null],["Farmer Carry",3,1,25],["KB Calf Raise",3,10,25]]]),
  mk("2026-02-16","full","Full Body","3 min bike, band upper + lower warm up",[["Circuit – 4 rds",["7-7-7 Curl",4,21,12],["Leg Curl",4,10,45],["Cable Row",4,10,45]],["Circuit – 3 rds",["Seated Push Press",3,10,10],["Leg Extension",3,10,45],["Cable Tricep Extension",3,10,35]],["Core – 3 rds",["Dead Bug",3,10,5],["Heel Taps",3,20,null]],["Finisher",["Cardio",1,1,null],["KB High Pull",1,8,null],["Lunge Pulse",1,10,null]]]),
];

const SEED_CLIENT_KERIE={id:"kerie",name:"Kerie",fullName:"Kerie",startDate:"2025-10-03",color:"#F97316",
  scheduleDays:["M","F"],scheduleNotes:"1-2x/week, full body focus",
  focusAreas:"Full body with emphasis on compound circuits, core stability, and conditioning finishers. Modified push-ups (incline). Uses KBs, DBs, cables, plates, machines. Building general strength.",
  goals:"General fitness & strength. Build upper body pressing strength, improve core stability, develop conditioning base.",
  workoutTypes:["full","upper"],
  dob:"",gender:"F",startingWeight:"",considerations:[],checkins:[]};

const SEED_BILLY=[
  mk("2025-01-13","full","Full Body","3 min bike, class warm up",[["Circuit – 3 rds",["Push Up",3,10,null],["DB Bicep Curl",3,10,25,"A:10-15"],["Goblet Squat",3,10,35,"A:26"]],["Circuit – 3 rds",["DB Front Raise",3,10,10,"A:5-10"],["Walking Lunge",3,10,null,"BW"],["Plank KB Pull Through",3,10,26,"A:18"]],["Finisher – 3 rds",["Bike",3,12,null,"12 cal"],["DB RDL",3,8,25,"A:15"],["DB Push Press",3,10,15,"A:10"]]]),
  mk("2025-01-20","full","Full Body","3 min bike, class warm up",[["Circuit – 3 rds",["Incline Push Up",3,10,null],["Butterfly Situp",3,10,null],["KB Squat to High Pull",3,10,26,"A:18"]],["Circuit – 3 rds",["KB Curl",3,10,26,"A:18"],["Goblet Squat",3,10,35,"A:26"],["Plank",3,20,null,"sec"]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Medball Slam",3,10,20,"A:10"]]]),
  mk("2025-01-27","full","Full Body","3 min bike, class warm up",[["Circuit – 4 rds",["Butterfly Situp",4,12,null],["Goblet Squat",4,10,44,"A:26"],["DB Bicep Curl",4,10,25,"A:8"]],["Circuit – 4 rds",["DB Front Raise",4,10,10,"A:5"],["Walking Lunge",4,10,20,"A:BW/5"],["Lateral Raise",4,10,10,"A:5"]],["Circuit – 4 rds",["Bike",4,12,null,"12 cal"],["DB RDL",4,8,25,"A:15"],["DB Incline Chest Press",4,10,20,"A:10"]],["Finisher – 3 rds",["Plank",3,40,null,"sec"]]]),
  mk("2025-02-03","full","Full Body","3 min bike, class warm up",[["Circuit – 4 rds",["Incline Push Up",4,10,null],["Leg Lift",4,10,null],["KB Clean & Squat",4,10,35,"A:26, A did BW squats"]],["Circuit – 4 rds",["KB Curl",4,10,35,"A:26"],["KB Sumo Squat Pulse",4,20,null,"A:26"],["Plank",4,20,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"300m"],["Medball Slam",3,10,20,"A:15"]]]),
  mk("2025-02-10","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Weighted Deadbug",4,20,null],["Weighted Situp",4,10,null,"B:med ball, A:band assisted"]],["Circuit – 4 rds",["Step Up",4,10,20,"A:5"],["Around the World",4,10,10,"A:5"],["DB RDL",4,10,25,"A:15"]],["Circuit – 4 rds",["Zottman Curl",4,10,25,"A:8"],["KB Sumo Squat",4,10,null,"A:18"],["Bench Dip",4,10,null]],["Circuit – 4 rds",["Row Erg",4,12,null,"12 cal"],["Lunge Pulse",4,15,20,"A:BW/5"]],["Finisher – 3 rds",["Plank",3,40,null,"sec"]]]),
  mk("2025-02-17","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Weighted Deadbug",4,20,30,"A:15"],["Weighted Situp",4,10,30,"A:band assisted"]],["Circuit – 4 rds",["Goblet Squat",4,10,40,"A:20"],["DB Halo With Twist",4,10,25,"A:15"],["Barbell RDL",4,10,null,"A:bar, B:15s"]],["Circuit – 4 rds",["KB Suitcase Deadlift",4,8,53,"A:26"],["Farmer Carry",4,2,53,"A:26"],["KB Calf Raise",4,10,53,"A:26/18"]],["Circuit – 4 rds",["Ski Erg",4,12,null,"10/12 cal"],["KB Curl to Press",4,10,53,"A:26"],["Lunge Pulse",4,15,null]]]),
  mk("2025-02-24","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Weighted Situp",4,10,20,"A:BW"],["Russian Twist",4,20,20,"A:15"]],["Circuit – 4 rds",["Hammer Curl",4,10,25,"A:10"],["Goblet Squat",4,10,40,"A:20"],["Around the World",4,10,10,"A:5"]],["Circuit – 4 rds",["Seated Shoulder Press",4,10,25,"A:10"],["Walking Lunge",4,10,20,"A:BW"],["Banded Tricep Pushdown",4,10,null]],["Finisher – 2 rds",["Bike",2,1,null],["Bike",2,1,null]]]),
  mk("2025-03-03","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Weighted Situp",4,10,null],["Flutter Kick",4,25,null]],["Trap Bar DL – 4 rds",["Trap Bar Deadlift",4,8,null,"A:5s, B:25s"]],["Circuit – 4 rds",["DB ISO Hold Bicep Curl",4,10,20,"A:10"],["Step Up",4,10,20,"A:8"],["Bench Dip",4,15,null]],["Circuit – 4 rds",["Goblet Squat",4,10,40,"A:20"],["DB Incline Crush Grip Press",4,10,25,"A:10"],["DB Chest Fly",4,10,25,"A:10"]],["Finisher – 3 rds",["Ski Erg",3,12,null],["KB High Pull",3,10,35,"A:18"]]]),
  mk("2025-03-10","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["DB Halo With Twist",4,10,25,"A:12"],["Single Arm DB Press March",4,10,25,"A:12"]],["Circuit – 4 rds",["Walking Lunge",4,10,null,"A:BW, B:sandbag"],["DB Front Raise",4,10,10,"A:5"],["Barbell RDL",4,10,null,"A:bar, B:20s"]],["Circuit – 4 rds",["Zottman Curl",4,10,20,"A:8"],["KB Sumo Squat",4,10,null],["Banded Tricep Pushdown",4,12,null]],["Finisher – 4 rds",["Row Erg",4,12,null,"12 cal"],["Medball Slam",4,10,null]]]),
  mk("2025-03-17","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Ab Rollout",4,10,null],["Russian Twist",4,20,20,"A:15"]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,25,"A:12"],["Sled Push/Drag",4,1,null,"A:1-45, B:3-45"],["Gorilla Row",4,8,null,"A:26, B:brown"]],["Circuit – 4 rds",["Seated Shoulder Press",4,8,25,"A:10"],["Sled Push/Drag",4,1,null,"A:45"],["Bench Dip",4,8,null]],["Finisher",["Bike",3,1,null],["Bike Both",3,1,null],["Bike",3,1,null]]]),
  mk("2025-03-24","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Weighted Situp",4,10,null],["Flutter Kick",4,25,null]],["Circuit – 4 rds",["Trap Bar Deadlift",4,8,null,"A:5s, B:25s"],["Farmer Carry",4,2,53,"A:35"]],["Circuit – 4 rds",["5-5-5 Curl",4,15,25,"A:10"],["Step Up",4,10,25,"A:10"],["Banded Tricep Pushdown",4,15,null]],["Circuit – 4 rds",["Goblet Squat",4,10,40,"A:20"],["DB Incline Crush Grip Press",4,10,25,"A:10"],["DB Chest Fly",4,10,25,"A:10"]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Medball Slam",3,10,30,"A:15"]]]),
  mk("2025-03-31","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["DB Halo With Twist",4,10,26,"A:18"],["Single Arm Press March",4,20,35,"A:26"]],["Circuit – 4 rds",["Incline Curl",4,10,25,"A:10"],["Sumo Squat",4,10,40,"A:20"],["Around the World",4,10,10,"A:5"]],["Circuit – 4 rds",["Seated Shoulder Press",4,8,25,"A:10"],["Skull Crusher",4,8,null],["Reverse Lunge",4,8,20,"A:BW/5"]],["Finisher",["Bike",3,1,null],["Bike Both",3,1,null],["Bike",3,1,null]]]),
  mk("2025-04-07","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Deadbug Crunch",4,10,null],["Russian Twist",4,20,null]],["Circuit – 4 rds",["Trap Bar Deadlift",4,8,null,"A:15s, B:35s"],["Farmer Carry",4,2,53,"A:35"]],["Circuit – 4 rds",["7-7-7 Curl",4,21,25,"A:10"],["Bench Step Down",4,10,null,"BW"],["Bench Dip",4,10,null]],["Circuit – 4 rds",["DB Row",4,8,30,"A:20"],["DB Chest Press",4,10,30,"A:10"],["Incline Push Up",4,10,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Medball Slam",3,10,30,"A:15"]]]),
  mk("2025-04-10","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Single Arm Press March",4,20,30,"A:20"],["Side Crunch",4,10,30,"A:20"]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,25,"A:12"],["Sled Push/Drag",4,1,null,"A:1-45, B:3-45"],["Gorilla Row",4,8,null,"A:26, B:brown"]],["Circuit – 4 rds",["Seated Shoulder Press",4,8,25,"A:10"],["Goblet Squat",4,8,null,"A:26, B:brown"],["Banded Tricep Extension",4,8,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"150m"],["Medball Slam",3,10,null],["Plank",3,16,null]]]),
  mk("2025-04-14","full","Full Body","3 min bike, class warm up",[["Core – 3 rds",["Ab Rollout",3,10,null],["Russian Twist",3,20,null]],["Circuit – 4 rds",["Walking Lunge",4,10,null,"A:10s, B:40 sandbag"],["Plate Front Raise",4,10,25,"A:10"],["Barbell RDL",4,10,null,"A:10s, B:35s"]],["Circuit – 4 rds",["Zottman Curl",4,10,25,"A:10"],["KB Sumo Squat",4,10,70,"A:35"],["Banded Tricep Kickback",4,12,null]],["Finisher – 4 rds",["Row Erg",4,12,null,"12 cal"],["Medball Slam",4,10,null]]]),
  mk("2025-04-21","full","Full Body","3 min bike, class warm up",[["Core – 4 rds",["Deadbug Crunch",4,10,null],["Heel Taps",4,20,null]],["Circuit – 4 rds",["Trap Bar Deadlift",4,8,null,"A:15s, B:45s"],["Farmer Carry",4,2,53,"A:35"]],["Circuit – 4 rds",["Incline Curl",4,8,25,"A:12"],["Bulgarian Split Squat",4,8,null,"BW"],["DB Chest Fly",4,8,25,"A:10"]],["Circuit – 4 rds",["Gorilla Row",4,8,null,"A:26, B:brown"],["Trap Bar Deadlift",4,8,null,"A:15s, B:65s"],["Push Up",4,10,null]],["Finisher – 3 rds",["Ski Erg",3,12,null],["KB High Pull",3,10,null,"A:26, B:brown"]]]),
  mk("2025-04-28","full","Full Body","3 min bike, class warm up",[["Core – 3 rds",["Weighted Situp",3,10,null],["Russian Twist",3,20,null]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,25,"A:12"],["Sled Push/Drag",4,1,null,"A:1-45, B:5-45"],["Barbell Row",4,8,null,"A:10s, B:25s"]],["Circuit – 4 rds",["Around the World",4,8,15,"A:8"],["Step Up",4,8,30,"A:10"],["Bench Dip",4,8,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"150m"],["Medball Slam",3,10,30,"A:15"]]]),
  mk("2025-05-05","full","Full Body","3 min bike, class warm up",[["Circuit – 4 rds",["Incline Curl",4,10,25,"A:10"],["KB Sumo Squat",4,10,70,"A:35"],["Plate Front Raise",4,10,35,"A:15"]],["Bike + Legs – 3 rds",["Bike",3,1,null],["Leg Extension",3,10,null]],["Bike + Back – 3 rds",["Bike",3,1,null],["Cable Row",3,10,null]],["Circuit – 4 rds",["KB Curl to Press",4,10,null,"A:26, B:brown"],["Bench Dip",4,10,null],["Calf Raise",4,15,null]],["Core – 3 rds",["Plate Halo",3,10,25,"A:15"],["Plate March",3,20,35,"A:15"]]]),
  mk("2025-05-19","lower","Lower Body","3 min bike, banded side steps, banded monster, band squats",[["BB Back Squat",["Back Squat",1,8,95],["Back Squat",1,8,105],["Back Squat",1,8,115],["Back Squat",1,5,125],["Back Squat",1,5,135]],["Core – 3 rds",["Ab Rollout",3,10,null],["DB Side Crunch",3,10,35,"A:26"]],["Circuit – 3 rds",["Leg Extension",3,10,null,"A:45, B:2-45"],["KB Sumo Squat Pulse",3,20,null]],["Circuit – 3 rds",["Hamstring Curl",3,10,null,"A:45, B:2-45"],["Lunge Pulse",3,15,null]],["Finisher – 3 rds",["Bike",3,1,null,"1.5 min"],["KB Suitcase Deadlift",3,8,35],["KB Calf Raise",3,10,35]]]),
  mk("2025-05-27","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat",["Back Squat",1,10,135],["Back Squat",4,8,145]],["Circuit – 4 rds",["Sled Push/Drag",4,1,null,"A:1-2 plate, B:4 plates"],["Butterfly Situp",4,10,null],["Calf Raise",4,10,53,"A:26"]],["Circuit – 4 rds",["Leg Extension",4,8,null,"A:45/25, B:2-45/25"],["DB RDL",4,8,45]],["Circuit – 4 rds",["Leg Curl",4,8,null,"A:45/25, B:2-45/25"],["Goblet Squat",4,8,50,"A:35"]]]),
  mk("2025-06-02","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat",["Back Squat",1,10,165],["Back Squat",4,8,185,"A: 65→75"]],["Glute Activation – 3 rds",["Banded Glute Bridge",3,10,null],["Banded Adductor Pulse",3,15,null]],["Circuit – 4 rds",["Leg Extension",4,10,null,"A:45/25, B:2-45/25"],["Split Stance Lunge",4,8,30,"A:15"]],["Conditioning – 3 rds",["Bike",3,10,null,"10 cal"],["KB Swing",3,8,53,"A:26"],["KB Sumo Squat",3,8,70,"A:44"]],["Circuit – 4 rds",["Leg Curl",4,10,null,"A:45/25, B:2-45/25"],["Farmer Carry",4,3,53,"A:35"]]]),
  mk("2025-06-09","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat",["Back Squat",1,10,135],["Back Squat",4,8,145,"A: 55→65"]],["Circuit – 4 rds",["Sled Drag",4,1,null,"A:1-2 plate, B:4 plates"],["Calf Raise",4,10,53,"A:26"]],["Circuit – 4 rds",["Leg Extension",4,8,null,"A:45/25, B:2-45/25"],["DB RDL",4,8,45]],["Circuit – 4 rds",["Leg Curl",4,8,null,"A:45/25, B:2-45/25"],["Incline Goblet Squat",4,8,50,"A:35"]],["Core – 4 rds",["Dead Bug",4,10,null],["Heel Taps",4,20,null]]]),
  mk("2025-06-13","upper","Upper Body","3 min bike, PVC",[["Circuit – 4 rds",["Barbell Curl",4,10,null],["DB Crush Grip Press",4,10,30,"A:15"],["Cable Tricep Extension",4,10,null]],["Circuit – 4 rds",["DB Push Press",4,10,null],["Gorilla Row",4,8,53,"A:26"],["Plate Front Raise",4,10,null]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,8,null],["Plate Halo",4,10,null],["DB Side Crunch",4,10,null]]]),
  mk("2025-06-16","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat (Ramping)",["Back Squat",1,8,155],["Back Squat",1,8,175],["Back Squat",1,8,185],["Back Squat",1,8,195],["Back Squat",1,6,205,"A: 5x8 @65 w/ box"]],["Circuit – 4 rds",["Step Up",4,8,25,"A:15"],["Calf Raise",4,10,53,"A:26"]],["Circuit – 4 rds",["Leg Extension",4,8,null,"A:45/25, B:2-45/25"],["DB RDL",4,8,45,"A:20"]],["Circuit – 4 rds",["Leg Curl",4,8,null,"A:45/25, B:2-45/25"],["Squat Hold Step Back",4,8,null]],["Finisher – 4 rds",["Bike",4,1,null],["Bike Both",4,1,null],["Sumo Squat Pulse",4,10,null]]]),
  mk("2025-06-24","lower","Lower Body","3 min bike, band warm up",[["Trap Bar DL – 5 rds",["Trap Bar Deadlift",5,8,205,"A: 75"]],["Circuit – 4 rds",["Sled Push/Drag",4,1,null,"A:1-2 plate, B:4 plates"],["Calf Raise",4,10,53,"A:35"]],["Circuit – 4 rds",["Landmine Hack Squat",4,8,25,"A:10"],["DB RDL",4,8,45,"A:20"]],["Core – 4 rds",["Plate Reverse Crunch",4,10,null],["Heel Taps",4,20,null]]]),
  mk("2025-06-30","lower","Lower Body","3 min bike, band warm up",[["BB Back Squat",["Back Squat",1,10,165],["Back Squat",2,8,185],["Back Squat",2,6,195,"A: 5x8 @65 w/ box"]],["Core – 3 rds",["Banded Glute Bridge",3,10,null],["Banded Adductor Pulse",3,15,null]],["Circuit – 4 rds",["Leg Extension",4,10,null,"A:45/25, B:2-45+25"],["Split Stance Lunge",4,10,30,"A:15"]],["Conditioning – 4 rds",["Row Erg",4,1,null,"200m"],["KB Swing",4,8,53,"A:26"],["KB Sumo Squat",4,8,70,"A:44"]],["Circuit – 4 rds",["Leg Curl",4,10,null,"A:45/25, B:2-45+25"],["Farmer Carry",4,3,70,"A:44"]]]),
  mk("2025-07-07","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat (Ramping)",["Back Squat",1,8,175],["Back Squat",1,6,185],["Back Squat",1,6,195],["Back Squat",1,5,205],["Back Squat",1,5,215,"A: 5x8 @65 w/ box"]],["Circuit – 4 rds",["Step Down",4,8,25,"A:15"],["Calf Raise",4,10,53,"A:26"]],["Circuit – 4 rds",["Leg Extension",4,8,null,"A:45/25, B:2-45/25"],["DB RDL",4,8,45,"A:20"]],["Circuit – 4 rds",["Leg Curl",4,8,null,"A:45/25, B:2-45/25"],["Squat Hold Step Back",4,8,null]],["Finisher – 4 rds",["Bike",4,1,null],["Bike Both",4,1,null],["Sumo Squat Pulse",4,10,null]]]),
  mk("2025-07-14","lower","Lower Body","3 min bike, banded side steps, banded monster",[["BB Back Squat (Ramping)",["Back Squat",1,8,175],["Back Squat",1,6,185],["Back Squat",1,6,195],["Back Squat",1,5,205],["Back Squat",1,5,215,"A: 5x8 @65 w/ box"]],["Circuit – 4 rds",["Leg Curl",4,8,null,"A:45/35, B:2-45/35"],["Calf Raise",4,15,53,"A:35"]],["Circuit – 4 rds",["Sled Drag",4,1,null,"A:2-3 plate, B:5-6 plates"]],["Circuit – 4 rds",["Sumo Squat",4,10,null],["DB Single Leg RDL",4,8,45,"A:20"]],["Finisher – 3 rds",["Row Erg",3,1,null,"250m"],["Power Beast",3,20,null,"sec"],["Power Beast",3,10,null]]]),
  mk("2025-07-21","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Plate Crunch",4,10,null],["Kneeling Plate Hip Halo",4,10,35,"A:15"]],["Circuit – 4 rds",["DB Bicep Curl",4,10,30,"A:15"],["DB Lat Pullover",4,10,50,"A:25"],["Banded Tricep Pushdown",4,10,null]],["Circuit – 4 rds",["DB Incline Crush Grip Press",4,10,30,"A:20"],["Cable Row",4,10,null],["Around the World",4,10,15,"A:8-10"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,10,53,"A:26"],["Push Up",4,10,null]]]),
  mk("2025-07-28","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Single Arm DB Press March",4,20,25,"A:15"],["DB Side Crunch",4,10,53,"A:35"]],["Circuit – 4 rds",["Incline Curl",4,10,30,"A:15"],["DB Incline Crush Grip Press",4,10,40,"A:20"],["Banded Tricep Extension",4,10,null]],["Circuit – 4 rds",["Barbell Row",4,8,95,"A:65"],["DB Leaning Lateral Raise",4,10,15,"A:8-10"]],["Finisher – 4 rds",["Row Erg",4,1,null,"300m"],["KB Curl to Press",4,10,53,"A:26"],["Push Up",4,10,null]]]),
  mk("2025-08-05","upper","Upper Body","3 min bike, PVC",[["Bench Press (Ramping)",["Barbell Bench Press",1,8,115],["Barbell Bench Press",1,8,135],["Barbell Bench Press",1,6,155],["Barbell Bench Press",1,6,165,"A: 2x8 bar, 2x8 50-55"]],["Core – 3 rds",["Weighted Deadbug",3,10,20,"A:15"],["Russian Twist",3,20,null]],["Circuit – 4 rds",["Push Up",4,10,null],["DB Bicep Curl",4,10,30,"A:15"],["Bench Dip",4,10,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Gorilla Row",3,10,70,"A:26"],["Plate Front Raise",3,10,25,"A:10"]]]),
  mk("2025-08-11","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["Zottman Curl",4,10,null],["Incline Push Up",4,10,null],["Cable Tricep Extension",4,12,null]],["Core – 4 rds",["Plate Halo",4,10,null],["DB Side Crunch",4,10,null]],["Circuit – 4 rds",["Cable Row",4,10,null],["Lateral Raise",4,10,null],["DB Reverse Fly",4,10,null]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,10,null],["KB Curl",4,10,null]]]),
  mk("2025-08-19","upper","Upper Body","3 min bike, PVC",[["Core",["Plank KB Pull Through",1,16,35],["Plank",1,10,null]],["Circuit – 4 rds",["DB Bicep Curl",4,15,25,"A:12"],["Pull Up",4,30,null,"sec"],["Single Arm Diagonal Tricep Extension",4,10,40,"A:20"]],["Circuit – 4 rds",["DB Push Press",4,10,20],["Around the World",4,10,10],["DB T Raise",4,10,12]],["Finisher – 4 rds",["Ski Erg",4,10,null],["Gorilla Row",4,8,35],["Push Up",4,10,null]]]),
  mk("2025-09-02","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Plate Crunch",4,10,null],["Heel Taps",4,20,null]],["Circuit – 4 rds",["DB Bicep Curl",4,10,35,"A:12"],["DB Lat Pullover",4,10,50,"A:25"],["Banded Tricep Pushdown",4,10,null]],["Circuit – 4 rds",["DB Crush Grip Press",4,10,30,"A:20"],["DB Chest Fly",4,10,25,"A:15"],["Around the World",4,10,15,"A:8-10"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB Curl to Press",4,8,44,"A:26"],["Gorilla Row",4,10,70,"A:26"]]]),
  mk("2025-09-08","upper","Full Upper","3 min bike, PVC",[["Core – 3 rds",["Banded Glute Bridge",3,10,null],["Banded Adductor",3,20,null]],["Circuit – 4 rds",["Concentration Curl",4,8,15],["Seated Push Press",4,10,10],["Plate Front Raise Press",4,8,10]],["Circuit – 4 rds",["DB Lat Pullover",4,10,25],["Gorilla Row",4,8,35],["Single Arm Banded Tricep Extension",4,10,null]],["Finisher",["Bike",4,1,null],["Bike Both",4,1,null]]]),
  mk("2025-09-15","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Single Arm DB Press March",4,20,25,"A:15"],["DB Side Crunch",4,10,53,"A:35"]],["Circuit – 4 rds",["Barbell Curl",4,10,null,"A:5/2.5, B:25"],["Push Up",4,10,null],["Bench Dip",4,10,null]],["Circuit – 4 rds",["Barbell Row",4,8,95,"A:65"],["Around the World",4,10,20,"A:10"]],["Finisher – 4 rds",["Ski Erg",4,10,null,"10/12/14 cal"],["KB Curl",4,8,53,"A:26"],["KB High Pull",4,8,null]]]),
  mk("2025-09-22","upper","Upper Body","Row 3 min, PVC",[["Circuit – 4 rds",["Seated Shoulder Press",4,8,40,"A:15"],["Lateral Raise",4,10,20,"A:8"],["Single Arm Row",4,10,40,"A:30"]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,15],["Cable Lat Pull Down",4,10,50],["Banded Tricep Pushdown",4,10,null]],["Core",["Cable Crunch Hold",1,10,null],["Single Arm DB Press March",1,20,null]],["Finisher – 4 rds",["Row Erg",4,1,null,"200m"],["KB High Pull",4,10,18],["Push Up",4,10,null]]]),
  mk("2025-10-06","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["7-7-7 Curl",4,21,20,"A:10"],["Push Up",4,10,null,"A:incline"],["Bench Dip",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,null],["DB Side Crunch",4,10,null]],["Circuit – 4 rds",["Single Arm Row",4,8,45,"A:25"],["DB Front Raise",4,10,25,"A:8"],["DB Reverse Fly",4,10,25,"A:10"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,10,null],["KB Curl",4,10,null]]]),
  mk("2025-10-13","upper","Upper Body","3 min bike, PVC",[["Circuit – 4 rds",["DB Bicep Curl",4,10,35,"A:12"],["DB Lat Pullover",4,10,50,"A:25"],["Bench Dip",4,10,null]],["Core – 4 rds",["Plate Crunch",4,10,null],["Russian Twist",4,20,null]],["Circuit – 4 rds",["DB Incline Crush Grip Press",4,10,35,"A:20"],["Gorilla Row",4,10,70,"A:26"],["Around the World",4,10,15,"A:8-10"]],["Finisher – 4 rds",["Row Erg",4,1,null,"200m"],["Medball Slam",4,10,null]]]),
  mk("2025-10-20","upper","Upper Body","Row 3 min, PVC",[["Circuit – 4 rds",["Seated Shoulder Press",4,8,40,"A:12-15"],["Single Arm Cable Lat Pulldown",4,10,null],["Single Arm Row",4,10,40,"A:30"],["Plank",4,16,null]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,30,"A:15"],["Plate Front Raise",4,10,35,"A:15"],["Banded Tricep Kickback",4,10,null]],["Core",["Single Arm DB Press Walk",1,1,null,"A:12-15, B:25-30"],["DB Side Crunch",1,10,53,"A:35"]],["Finisher – 4 rds",["Row Erg",4,1,null,"200m"],["KB High Pull",4,10,53,"A:26"]]]),
  mk("2025-10-27","upper","Upper Body","3 min bike, PVC",[["Bench Press (Ramping)",["Barbell Bench Press",1,8,135],["Barbell Bench Press",1,8,155],["Barbell Bench Press",1,6,175],["Barbell Bench Press",1,6,195,"A: 2x8 @25bar, 2x6 @25bar+5s"]],["Core – 3 rds",["Weighted Deadbug",3,10,20,"A:15"],["Russian Twist",3,20,null]],["Circuit – 4 rds",["DB Bicep Curl",4,10,30,"A:15"],["Around the World",4,10,25,"A:10"],["Bench Dip",4,10,null]],["Finisher – 3 rds",["Row Erg",3,1,null,"200m"],["Gorilla Row",3,10,70,"A:35"],["Plate Front Raise Press",3,10,25,"A:10"]]]),
  mk("2025-11-03","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["Zottman Curl",4,10,null],["Push Up",4,10,null],["Cable Tricep Extension",4,12,null],["Farmer Carry",4,2,null,"A:35/53, B:53/70"]],["Core – 4 rds",["Plate Halo",4,10,null],["Cable Crunch Hold",4,10,null]],["Circuit – 4 rds",["Gorilla Row",4,10,null],["Lateral Raise",4,10,null],["DB Chest Fly",4,10,null]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,10,null],["KB Curl",4,10,null]]]),
  mk("2025-12-01","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Plate Crunch",4,10,null],["Heel Taps",4,20,null]],["Circuit – 4 rds",["DB Bicep Curl",4,10,35,"A:12"],["DB Lat Pullover",4,10,50,"A:25"],["Banded Tricep Pushdown",4,10,null]],["Circuit – 4 rds",["DB Crush Grip Press",4,10,30,"A:20"],["DB Chest Fly",4,10,25,"A:15"],["Around the World",4,10,15,"A:8-10"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB Curl to Press",4,8,44,"A:26"],["Gorilla Row",4,10,70,"A:26"]]]),
  mk("2025-12-08","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["7-7-7 Curl",4,21,20,"A:10"],["Push Up",4,10,null,"A:incline"],["Bench Dip",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,null],["DB Side Crunch",4,10,null]],["Circuit – 4 rds",["Single Arm Row",4,8,45,"A:25"],["DB Front Raise",4,10,25,"A:8"],["DB Reverse Fly",4,10,25,"A:10"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB High Pull",4,10,null],["KB Curl",4,10,null]]]),
  mk("2025-12-15","upper","Upper Body","3 min bike, PVC",[["Circuit – 4 rds",["DB Bicep Curl",4,10,25,"A:12"],["Pull Up",4,30,null,"sec"],["Single Arm Diagonal Tricep Extension",4,10,40,"A:20"]],["Core",["Plank KB Pull Through",1,16,null,"A:26, B:44"],["Plank",1,10,null]],["Circuit – 4 rds",["DB Push Press",4,10,20],["Around the World",4,10,10],["Cable Row",4,10,60,"A:40"]]]),
  mk("2025-12-22","upper","Upper Body","3 min bike, PVC",[["Core – 4 rds",["Single Arm DB Press March",4,20,25,"A:15"],["DB Side Crunch",4,10,53,"A:35"]],["Circuit – 4 rds",["Barbell Curl",4,10,null,"A:35bar, B:10/2.5"],["Push Up",4,10,null],["Bench Dip",4,10,null]],["Circuit – 4 rds",["Barbell Row",4,8,null,"A:10s, B:45s"],["DB Leaning Lateral Raise",4,10,25,"A:8"]],["Finisher – 4 rds",["Ski Erg",4,12,null],["KB Curl to Press",4,10,53,"A:26"]]]),
  mk("2025-12-29","upper","Upper Body","Row 3 min, PVC",[["Circuit – 4 rds",["Seated Shoulder Press",4,8,40,"A:12-15"],["Lateral Raise",4,10,20,"A:8"],["Single Arm Row",4,10,45,"A:30"]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,15],["Cable Lat Pull Down",4,10,50],["Banded Tricep Pushdown",4,10,null]],["Core",["Cable Crunch Hold",1,10,null],["Band Hold Leg Lift",1,10,null]],["Finisher – 4 rds",["Bike",4,1,null,"1.5 min"],["Medball Slam",4,10,null]]]),
  mk("2026-01-05","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["7-7-7 Curl",4,21,20,"A:10"],["Push Up",4,10,null,"A:incline"],["Bench Dip",4,10,null]],["Core – 4 rds",["Plate Halo",4,10,null],["DB Side Crunch",4,10,null]],["Circuit – 4 rds",["Single Arm Row",4,8,45,"A:25"],["Plate Front Raise",4,10,45,"A:15"],["Cable Face Pull",4,10,null]],["Finisher – 4 rds",["Bike",4,1,null],["Bike Both",4,1,null]]]),
  mk("2026-01-12","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["Concentration Curl",4,8,35,"A:15"],["Around the World",4,10,20,"A:8"],["Plate Front Raise Press",4,10,35,"A:15"]],["Core – 3 rds",["Banded Glute Bridge Lat Pullover",3,10,35,"A:18"],["Banded Glute Bridge",3,10,null],["Banded Adductor",3,20,null]],["Circuit – 4 rds",["Gorilla Row",4,8,70,"A:35"],["Farmer Carry",4,2,70,"A:35"],["Single Arm Banded Tricep Extension",4,10,null]],["Finisher",["Bike",4,1,null],["Bike Both",4,1,null]]]),
  mk("2026-02-09","upper","Full Upper","3 min bike, PVC",[["Circuit – 4 rds",["Zottman Curl",4,10,35,"A:12"],["Push Up",4,10,null],["Cable Tricep Extension",4,12,null]],["Core – 4 rds",["Plate Halo",4,10,35,"A:15"],["DB Side Crunch",4,10,53,"A:35"]],["Circuit – 4 rds",["Cable Row",4,10,60,"A:30"],["Lateral Raise",4,10,25,"A:10"],["Seated DB Reverse Fly",4,10,45,"A:12"]],["Finisher – 4 rds",["Bike",4,30,null,"sec"],["KB High Pull",4,10,53,"A:26"],["KB Curl",4,10,53,"A:26"]]]),
  mk("2026-02-16","upper","Upper Body","Row 3 min, PVC",[["Circuit – 4 rds",["Seated Shoulder Press",4,8,40,"A:15"],["Lateral Raise",4,10,20,"A:8"],["Single Arm Row",4,10,40,"A:30"]],["Circuit – 4 rds",["Incline Hammer Curl",4,8,15],["Cable Lat Pull Down",4,10,50],["Banded Tricep Pushdown",4,10,null]],["Core",["Cable Crunch Hold",1,10,null],["Single Arm DB Press March",1,20,null]],["Finisher – 4 rds",["Row Erg",4,1,null,"200m"],["KB High Pull",4,10,18],["Push Up",4,10,null]]]),
];

const SEED_CLIENT_BILLY={id:"billy",name:"Billy & Alli",fullName:"Billy & Alli",startDate:"2025-01-13",color:"#DC2626",
  scheduleDays:["M"],scheduleNotes:"Mondays, couple training. Billy's weights primary, Alli's in exercise notes (A: prefix).",
  focusAreas:"Couple training. Jan-May: full body circuits. Jun-Jul: dedicated lower body (BB Back Squat ramping to 215#). Aug+: upper body focus (bench press ramping to 195#, rows, curls, pressing). Billy progressing heavy compounds, Alli building from BW/light DB.",
  goals:"Billy: strength progression on squat (215#) and bench (195#). Alli: build foundational strength, improve squat depth, develop upper body. Both: conditioning and core stability.",
  workoutTypes:["full","lower","upper"],
  dob:"",gender:"",startingWeight:"",considerations:[],checkins:[]};

const SEED_CLIENT_PAT={id:"pat",name:"Pat",fullName:"Patrick",startDate:"2024-01-06",color:T.accent,
  scheduleDays:["T","TH"],scheduleNotes:"AM sessions, 2-3x/week. Typical split: Quad / Glute / Upper (Back focused)",
  focusAreas:"Lower body primary: Quad day (BB Back Squat) + Glute day (Trap Bar DL). Back/Upper 1x/week when scheduling allows.",
  goals:"General fitness & functional strength. Progressive overload on squat and deadlift.",
  dob:"",gender:"M",startingWeight:"",considerations:[],checkins:[]};
const SEED_CLIENT_RACHEL={id:"rachel",name:"Rachel",fullName:"Rachel",startDate:"2025-01-13",color:"#22C55E",
  scheduleDays:["SU"],scheduleNotes:"5:00 PM, 1 session/week. Evolved from Quad → Lower Body → Glutes phase",
  focusAreas:"Lower body focused: Quad days (BB Back Squat), Lower Body (Sumo DL/Squat, Trap Bar DL), Glute days (Hip Thruster). Heavy emphasis on glute development.",
  goals:"Glute & lower body strength. Progressive overload on Hip Thruster (up to 365#), Sumo DL (up to 205#), Back Squat (up to 160#).",
  dob:"",gender:"F",startingWeight:"",considerations:[],checkins:[]};
const SEED_CLIENT_ANGELA={id:"angela",name:"Angela",fullName:"Angela",startDate:"2025-01-13",color:"#9C27B0",
  scheduleDays:["W"],scheduleNotes:"1 session/week. Alternates Squat-focused and Hip Thruster-focused blocks. Includes treadmill intervals as finishers.",
  focusAreas:"Lower body dominant: Quad days (BB Back Squat up to 150#), Glute days (Hip Thruster up to 275#). Sumo DL phase (Apr-May 2025, peaked 145#). Occasional upper body.",
  goals:"Lower body strength & glute development. Progressive overload on Back Squat and Hip Thruster. Strong core work emphasis. Building toward heavier compound lifts.",
  workoutTypes:["quad","glute","lower","upper","full"],
  dob:"",gender:"F",startingWeight:"",considerations:[],checkins:[]};
const SEED_CLIENT_ADAM={id:"adam",name:"Adam",fullName:"Adam",startDate:"2024-12-23",color:"#14B8A6",
  scheduleDays:["S"],scheduleNotes:"1-2 sessions/week. Primary: bench press percentage/ramp work + full body accessories.",
  focusAreas:"Bench press focused: Push days with accessory upper body (curls, triceps, shoulders) and supplementary lower (leg ext, leg curl, sled, lunges). Occasional landmine and sled conditioning.",
  goals:"Bench press strength. Progressive overload — PR progression: 175→185→200→210→220→225→230→240→245#. Upper body hypertrophy and functional strength.",
  workoutTypes:["push"],
  dob:"",gender:"M",startingWeight:"",considerations:[],checkins:[]};
const SEED_CLIENT_DEANNA={id:"deanna",name:"Deanna",fullName:"Deanna",startDate:"2025-08-19",color:"#60A5FA",
  scheduleDays:["T","TH"],scheduleNotes:"2 sessions/week. Alternates: full body / lower body / upper (shoulder rehab). Heavy emphasis on scap strengthening.",
  focusAreas:"Full body with shoulder rehab focus. Upper days: scap work, banded pressing, light curls (ISO hold on bad arm). Lower days: sled drags, leg ext/curl machines, light trap bar DL, hip thrusters (95#). Modified push exercises (incline push ups, banded chest press).",
  goals:"Rebuild shoulder & bicep strength (R side). Build lower body foundation around knee/foot limitations. Progress to heavier compound lifts. Core stability.",
  workoutTypes:["full","lower","upper"],
  considerations:[{text:"Right shoulder & bicep injury — no heavy overhead pressing, no barbell curls R arm, use banded/ISO holds, scap rehab every upper day",date:"2025-08-19",active:true},{text:"Knee & foot — controlled step downs only, assisted calf raises, no heavy impact/jumping, sled drag over running",date:"2025-08-19",active:true}],
  substitutions:[{avoid:"Barbell Back Squat",use:"Trap Bar Deadlift, KB Sumo Squat, Goblet Squat"},{avoid:"Pull Ups",use:"Cable Lat Pulldown, Banded Lat Pull"},{avoid:"Barbell Curl",use:"ISO Hold Bad Arm, Good Arm Only Curl, Band Curl"},{avoid:"Running",use:"Bike, Row Machine, Walk"},{avoid:"Jump Squat",use:"Banded Sissy Squat, Tempo Split Squat Lunge"}],
  dob:"",gender:"F",startingWeight:"",checkins:[]};

// ── ANALYSIS ──────────────────────────────────────────
function liftProg(ws,lift){const r=[];ws.forEach(w=>{let mx=0;w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name===lift&&e.weight)mx=Math.max(mx,e.weight)}));if(mx>0)r.push({date:w.date,max:mx})});return r}
// Smart lift detection: find a client's top lifts by max weight, with aliases merged
const LIFT_ALIASES={"Barbell Back Squat":["Back Squat","B Stance Back Squat"],"Trap Bar Deadlift":["Trap Bar RDL"],"Hip Thruster":["Barbell Hip Thrust","Banded Hip Thrust"],"Sumo Deadlift":["Barbell Sumo Deadlift"],"Barbell Bench Press":["Barbell Bench Press","DB Bench Press"],"Barbell RDL":["DB RDL","Barbell Deficit RDL"],"Goblet Squat":["Goblet Squat","KB Elevated Goblet Squat","Goblet Squats","Incline Goblet Squat","Incline Goblet Squats","Heels Elevated Goblet Squat"]};
const LIFT_SHORT={"Barbell Back Squat":"Squat","Trap Bar Deadlift":"Trap DL","Hip Thruster":"Hip Thr","Sumo Deadlift":"Sumo DL","Barbell Bench Press":"Bench","Barbell RDL":"RDL","Barbell Military Press":"OHP","Goblet Squat":"Goblet","Leg Extension":"Leg Ext","Leg Curl":"Leg Curl","Hamstring Curl":"Ham Curl","Cable Row":"Cable Row"};
const LIFT_COLORS={"Barbell Back Squat":"quads","Trap Bar Deadlift":"hams","Hip Thruster":"glutes","Sumo Deadlift":"hams","Barbell Bench Press":"chest","Barbell RDL":"hams","Barbell Military Press":"arms","Goblet Squat":"quads","Leg Extension":"quads","Leg Curl":"hams","Hamstring Curl":"hams"};
function topLifts(ws,n=3){
  const maxByEx={};
  ws.forEach(w=>w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name&&e.weight&&e.weight>0){let canonical=e.name;for(const[main,aliases] of Object.entries(LIFT_ALIASES)){if(main===e.name||aliases.includes(e.name)){canonical=main;break}}if(!maxByEx[canonical])maxByEx[canonical]={max:0,count:0};if(e.weight>maxByEx[canonical].max)maxByEx[canonical].max=e.weight;maxByEx[canonical].count++}})));
  return Object.entries(maxByEx).filter(([,d])=>d.count>=2).sort((a,b)=>b[1].max-a[1].max).slice(0,n).map(([name,d])=>{
    const aliases=LIFT_ALIASES[name]||[];const prog=liftProg(ws,name);aliases.forEach(a=>{liftProg(ws,a).forEach(p=>{const i=prog.findIndex(x=>x.date===p.date);if(i>=0){if(p.max>prog[i].max)prog[i].max=p.max}else prog.push(p)})});prog.sort((a,b)=>a.date.localeCompare(b.date));
    return{name,short:LIFT_SHORT[name]||name.replace(/^(Barbell|DB|KB)\s/,"").slice(0,10),max:d.max,count:d.count,prog,color:T[LIFT_COLORS[name]||"accent"]};
  });
}
function exFreq(ws){const f={};ws.forEach(w=>{const seen={};w.blocks.forEach(b=>b.exercises.forEach(e=>{if(!e.name)return;if(!f[e.name])f[e.name]={count:0,last:null,lastW:null,lastR:null,lastS:null};if(!seen[e.name]){seen[e.name]={totalS:0,maxW:0,reps:0};f[e.name].count++}seen[e.name].totalS+=(e.sets||1);if(e.weight&&e.weight>seen[e.name].maxW)seen[e.name].maxW=e.weight;seen[e.name].reps=e.reps;f[e.name].last=w.date}));Object.entries(seen).forEach(([name,s])=>{f[name].lastW=s.maxW||null;f[name].lastR=s.reps;f[name].lastS=s.totalS})});return f}
function muscBal(ws,n=8){const c={};ws.slice(-n).forEach(w=>w.blocks.forEach(b=>b.exercises.forEach(e=>{(MM[e.name]||[]).forEach(g=>{if(g!=="Grip")c[g]=(c[g]||0)+(e.sets||1)})})));return c}
function getTypes(ws){const s=new Set();ws.forEach(w=>s.add(w.type));return[...s]}
function workoutToText(w){
  const dt=new Date(w.date+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});
  let t=`${w.label} — ${w.type.toUpperCase()}\n${dt}\n`;
  if(w.warmup)t+=`Warmup: ${w.warmup}\n`;t+="\n";
  w.blocks.forEach(b=>{t+=`${b.name}\n`;b.exercises.forEach(e=>{t+=`  ${e.name}: ${e.sets}×${e.reps}${e.weight?` @ ${e.weight}#`:' (BW)'}${e.notes?` — ${e.notes}`:''}\n`});t+="\n"});
  if(w.rpe)t+=`RPE: ${w.rpe}/10\n`;
  if(w.trainerNotes)t+=`Notes: ${w.trainerNotes}\n`;
  return t.trim();
}
// Day-of-week index: SU=0, M=1, T=2, W=3, TH=4, F=5, S=6
const DAY_IDX={SU:0,M:1,T:2,W:3,TH:4,F:5,S:6};
function clientStats(ws,scheduleDays){
  const sd=scheduleDays||[];const now=new Date();
  const validWs=ws.filter(w=>w.date&&!isNaN(new Date(w.date+"T12:00:00").getTime()));
  const getMonday=(d)=>{const dt=new Date(d.getTime());const day=dt.getDay();const diff=day===0?-6:1-day;dt.setDate(dt.getDate()+diff);dt.setHours(0,0,0,0);return dt};
  const thisMonday=getMonday(now);
  const weekMap={};
  validWs.forEach(w=>{const d=new Date(w.date+"T12:00:00");const mon=getMonday(d);const key=mon.toISOString().slice(0,10);weekMap[key]=(weekMap[key]||0)+1});
  let streak=0;
  const checkWeek=new Date(thisMonday.getTime());
  const thisKey=thisMonday.toISOString().slice(0,10);
  if(!weekMap[thisKey]){checkWeek.setDate(checkWeek.getDate()-7)}
  for(let i=0;i<52;i++){
    const key=checkWeek.toISOString().slice(0,10);
    if(weekMap[key])streak++;else break;
    checkWeek.setDate(checkWeek.getDate()-7);
  }
  let expected=0,hit=0;
  if(sd.length>0){
    for(let w=0;w<4;w++){
      const weekStart=new Date(thisMonday.getTime());weekStart.setDate(weekStart.getDate()-w*7);
      sd.forEach(day=>{
        const idx=DAY_IDX[day];if(idx===undefined)return;
        const target=new Date(weekStart.getTime());
        const offset=idx===0?6:idx-1;
        target.setDate(target.getDate()+offset);
        if(target<=now){
          expected++;
          const tStr=target.toISOString().slice(0,10);
          if(validWs.some(s=>s.date===tStr))hit++;
        }
      });
    }
  }
  const adherence=expected>0?Math.round(hit/expected*100):null;
  const thisWeekCount=weekMap[thisKey]||0;
  return{streak,adherence,thisWeekCount,thisWeekTarget:sd.length};
}

// ═══════════════════════════════════════════════════════════════
//  CLAUDE AI PROPOSAL ENGINE
// ═══════════════════════════════════════════════════════════════
async function aiGenProposal(allWs, type, client, pinnedExercises, todayReadiness) {
  const typed = allWs.filter(w => w.type === type);
  const recent = typed.slice(-5);
  const af = exFreq(allWs);
  const topExByType = Object.entries(af).filter(([n]) => (MM[n]||[]).length > 0).sort((a,b) => b[1].count - a[1].count).slice(0, 25);
  const tl = topLifts(allWs, 5);
  const liftMaxStr = tl.map(l => `${l.name}: ${l.max}#`).join(' | ');
  const considerations = (client.considerations || []).filter(c => c.active).map(c => c.text);
  const mb = muscBal(allWs);

  const recentSummary = recent.map(w => {
    const exList = w.blocks.flatMap(b => b.exercises.map(e => `${e.name} ${e.sets}x${e.reps}${e.weight ? ` @${e.weight}#` : ''}`));
    return `${w.date} (${w.label})${w.rpe?` RPE:${w.rpe}`:""}${w.readiness?` [Sleep:${w.readiness.sleep||"?"}/5 Sore:${w.readiness.soreness||"?"}/5 Energy:${w.readiness.energy||"?"}/5]`:""}: ${exList.join(', ')}${w.trainerNotes?`\n  → Trainer notes: ${w.trainerNotes}`:""}${w.readiness&&w.readiness.note?`\n  → Pre-session: ${w.readiness.note}`:""}`;
  }).join('\n');

  const topExSummary = topExByType.map(([n, d]) => `${n}: ${d.count}x, last ${d.last}, ${d.lastW ? d.lastW+'#' : 'BW'} ${d.lastR}reps`).join('\n');

  const prompt = `You are a professional personal trainer programming a workout. Return ONLY valid JSON, no markdown, no backticks, no explanation.

CLIENT PROFILE:
- Name: ${client.fullName || client.name}
- Focus: ${client.focusAreas || 'General fitness'}
- Schedule: ${client.scheduleNotes || client.schedulePattern || '2-3x/week'}
- Goals: ${client.goals || 'General strength'}
- Lift maxes: ${liftMaxStr || 'No data yet'}
${client.gender ? `- Gender: ${client.gender}` : ''}${client.startingWeight ? ` | Starting weight: ${client.startingWeight}` : ''}
${(()=>{const phase=getCurrentPhase(client.program,type);if(!phase||phase.completed||phase.upcoming)return'';return`
ACTIVE TRAINING PROGRAM (CRITICAL — honor these parameters for ${type.toUpperCase()} day):
- Phase: ${phase.block.name} (Week ${phase.weekInBlock} of ${phase.block.weeks})
- Overall: Week ${phase.weekTotal} of ${phase.totalWeeks}
- Rep Range for ${type}: ${phase.block.repRange||'standard'}
- Intensity for ${type}: ${phase.block.intensity||'moderate'}
${phase.block.notes?`- Notes: ${phase.block.notes}`:''}${phase.block.volumeNote?`\n- Volume: ${phase.block.volumeNote}`:''}
${phase.block.intensity==='low'||phase.block.name.toLowerCase().includes('deload')?'⚠️ DELOAD PHASE — reduce weights 40-50%, moderate reps, focus on form/mobility.':phase.weekInBlock===phase.block.weeks&&phase.block.weeks>2?'📌 FINAL WEEK of phase — peak volume if ascending, or begin tapering.':phase.weekInBlock===1?'📌 FIRST WEEK of phase — establish working weights at new rep ranges.':'Program within phase parameters.'}
YOU MUST honor the rep range and intensity. ${phase.block.repRange?`Keep all working sets in the ${phase.block.repRange} rep range.`:''}`;})()}

${considerations.length > 0 ? `ACTIVE INJURIES/CONSIDERATIONS (CRITICAL - you MUST avoid exercises that stress these areas):
${considerations.map(c => `⚠️ ${c}`).join('\n')}

For example: "Torn Quad" means NO barbell squats, NO leg extensions, NO lunges, NO jump squats - substitute with upper body, posterior chain, or isometric alternatives that don't load the quad. "Bad back" means NO deadlifts, NO heavy rows, NO RDLs. Be creative with substitutions.` : 'No active injuries.'}
${(client.substitutions||[]).length > 0 ? `
TRAINER-DEFINED SUBSTITUTION RULES (ALWAYS follow these when the avoided exercise would normally be programmed):
${client.substitutions.map(s => `• AVOID "${s.avoid}" → USE "${s.use}" instead`).join('\n')}` : ''}
${todayReadiness && (todayReadiness.sleep||todayReadiness.soreness||todayReadiness.energy) ? `
TODAY'S PRE-SESSION CHECK-IN:
- Sleep: ${todayReadiness.sleep||"?"}/5 | Soreness: ${todayReadiness.soreness||"?"}/5 | Energy: ${todayReadiness.energy||"?"}/5${todayReadiness.note ? `\n- Note: ${todayReadiness.note}` : ''}
${todayReadiness.soreness>=4||todayReadiness.energy<=2||todayReadiness.sleep<=2 ? '⚠️ CLIENT IS NOT AT 100% — reduce intensity: lower weights by 10-15%, favor lighter variations, add more mobility/activation work, reduce total volume.' : 'Client is feeling decent — program normally.'}` : ''}

WORKOUT TYPE REQUESTED: ${type}

LAST 5 ${type.toUpperCase()} SESSIONS:
${recentSummary || 'No prior sessions of this type.'}

EXERCISE FREQUENCY (top 25):
${topExSummary}

MUSCLE BALANCE (last 8 sessions, total sets): ${JSON.stringify(mb)}

INSTRUCTIONS:
1. Program a complete ~45 min session for type "${type}"
2. ${considerations.length > 0 ? 'CRITICALLY IMPORTANT: Completely avoid any exercise that would aggravate the listed injuries. Replace with safe alternatives. If the injury affects the primary lift for this workout type, substitute an entirely different movement pattern.' : 'Apply progressive overload where appropriate.'}
3. Use exercises from the client's history but also introduce 1-2 new variations for variety
4. If recent sessions show high soreness (4-5), high RPE (9-10), or low sleep/energy, auto-deload by reducing weight 10-15% or swapping heavy compounds for lighter variations
5. Include 4-5 blocks (warmup block optional, core, main work, accessories, conditioning/finisher)
5. Vary the structure - don't always use the same supersets/circuits. Mix in EMOMs, ladders, drop sets, tempo work, etc.
6. Choose DIFFERENT exercises from the most recent session - avoid repeating the exact same workout
${pinnedExercises && pinnedExercises.length > 0 ? `
PINNED EXERCISES (MUST KEEP - include these exactly as specified, in the same block positions):
${pinnedExercises.map(e => `- ${e.block}: ${e.name} ${e.sets}x${e.reps}${e.weight ? ` @${e.weight}#` : ''}${e.notes ? ` (${e.notes})` : ''}`).join('\n')}
Replace ONLY the non-pinned exercises with new variations. Keep the overall workout structure similar.` : ''}

Return this exact JSON structure:
{
  "label": "descriptive workout name",
  "warmup": "warmup description",
  "reasoning": "2-3 sentence explanation of programming choices${considerations.length > 0 ? ' and how injuries were accommodated' : ''}",
  "blocks": [
    {
      "name": "Block Name – rounds/format",
      "exercises": [
        {"name": "Exercise Name", "sets": 4, "reps": 10, "weight": 135, "notes": "optional tempo/cue"}
      ]
    }
  ]
}

Weight should be a number or null for bodyweight. Use exercise names from the client's history when possible.`;

  try {
    const resp = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await resp.json();
    const text = data.content?.map(i => i.text || "").join("\n") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    const phase=getCurrentPhase(client.program,type);
    const phaseTag=phase&&!phase.completed&&!phase.upcoming?{name:phase.block.name,week:phase.weekInBlock,totalWeeks:phase.block.weeks,repRange:phase.block.repRange,intensity:phase.block.intensity}:null;
    return {
      id: `ai-${type}-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type,
      status: "proposed",
      label: parsed.label || `${type} Day`,
      warmup: parsed.warmup || WU[type] || "General warmup",
      reasoning: parsed.reasoning || "",
      phase: phaseTag,
      blocks: (parsed.blocks || []).map(b => ({
        name: b.name,
        exercises: (b.exercises || []).map(e => ({
          name: e.name, sets: e.sets || 3, reps: e.reps || 10,
          weight: e.weight || null, notes: e.notes || "", done: false,
        })),
      })),
    };
  } catch (err) {
    console.error("AI proposal error:", err);
    return { id: `err-${Date.now()}`, date: new Date().toISOString().slice(0,10), type, status: "proposed",
      label: `${type} Day (AI unavailable)`, warmup: WU[type] || "", reasoning: "AI generation failed — " + (err.message || "unknown error"), blocks: [] };
  }
}

// ═══════════════════════════════════════════════════════════════
//  UI COMPONENTS (v5 — improved layout)
// ═══════════════════════════════════════════════════════════════
const ss={
  page:{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Outfit','Helvetica Neue',sans-serif",paddingBottom:"52px",overflowX:"hidden"},
  header:{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"14px 16px",boxShadow:"0 1px 2px rgba(0,0,0,0.03)"},
  content:{padding:"14px",maxWidth:"700px",margin:"0 auto",overflow:"hidden"},
  card:{background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"14px",marginBottom:"10px",boxShadow:"0 1px 2px rgba(0,0,0,0.04)",overflow:"hidden"},
  btn:(p)=>({background:p?T.accent:T.card,color:p?"#fff":T.text,border:`1px solid ${p?T.accent:T.border}`,padding:"7px 14px",borderRadius:"6px",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}),
  pill:(c)=>({display:"inline-block",padding:"2px 6px",borderRadius:"3px",fontSize:"9px",fontWeight:700,letterSpacing:".3px",textTransform:"uppercase",background:(c||T.dim)+"12",color:c||T.dim}),
  inp:{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"7px 8px",borderRadius:"4px",fontSize:"13px",fontFamily:"'JetBrains Mono',monospace",width:"50px",textAlign:"center"},
  mono:{fontFamily:"'JetBrains Mono',monospace"},
  navBar:{position:"fixed",bottom:0,left:0,right:0,background:T.card,borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-around",padding:"4px 0 6px",zIndex:100,boxShadow:"0 -1px 3px rgba(0,0,0,0.03)",transition:"transform .25s ease"},
  navBtn:(a)=>({background:"none",border:"none",color:a?T.accent:T.dim,fontSize:"11px",fontWeight:600,display:"flex",flexDirection:"column",alignItems:"center",gap:"1px",cursor:"pointer",fontFamily:"inherit",padding:"3px 12px"}),
};
function Pill({g}){return <span style={ss.pill(MC[g])}>{g}</span>}
function Stat({v,l,c}){return <div style={{...ss.card,textAlign:"center",padding:"12px 6px"}}><div style={{...ss.mono,color:c||T.accent,fontSize:"22px",fontWeight:700}}>{v}</div><div style={{color:T.dim,fontSize:"10px",marginTop:"1px"}}>{l}</div></div>}
function Chart({data,color=T.accent,h=110}){if(!data.length)return <div style={{color:T.dim,fontSize:"11px",textAlign:"center",padding:"16px"}}>No data</div>;const mx=Math.max(...data.map(d=>d.max)),mn=Math.min(...data.map(d=>d.max)),rng=mx-mn+30||50,H=h,W=Math.max(data.length*38,180);return <div style={{overflowX:"auto",overflowY:"hidden",maxWidth:"100%",WebkitOverflowScrolling:"touch"}}><svg viewBox={`0 0 ${W+50} ${H+26}`} width={W+50} height={H+26} style={{display:"block",maxWidth:"none"}}>{[0,.5,1].map((p,i)=>{const y=5+(1-p)*H,v=Math.round(mn-15+p*rng);return <g key={i}><line x1={36} y1={y} x2={W+42} y2={y} stroke={T.border} strokeWidth={.5}/><text x={32} y={y+3} textAnchor="end" fill={T.dim} fontSize="8" fontFamily="'JetBrains Mono',monospace">{v}</text></g>})}{data.map((d,i)=>{const x=42+i*((W-4)/Math.max(data.length-1,1)),y=5+(1-(d.max-mn+15)/rng)*H;const dt=new Date(d.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});return <g key={i}>{i>0&&<line x1={42+(i-1)*((W-4)/Math.max(data.length-1,1))} y1={5+(1-(data[i-1].max-mn+15)/rng)*H} x2={x} y2={y} stroke={color} strokeWidth={2}/>}<circle cx={x} cy={y} r={2.5} fill={color}/><text x={x} y={y-6} textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="'JetBrains Mono',monospace">{d.max}</text>{(i%Math.max(1,Math.floor(data.length/7))===0||i===data.length-1)&&<text x={x} y={H+16} textAnchor="middle" fill={T.dim} fontSize="7" fontFamily="'JetBrains Mono',monospace" transform={`rotate(-30,${x},${H+16})`}>{dt}</text>}</g>})}</svg></div>}
function Bars({ws}){const c=muscBal(ws);const e=Object.entries(c).sort((a,b)=>b[1]-a[1]);const mx=Math.max(...e.map(([,v])=>v),1);return <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>{e.map(([g,v])=><div key={g} style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{color:MC[g]||T.sub,fontSize:"11px",fontWeight:600,width:"68px",textAlign:"right",flexShrink:0}}>{g}</span><div style={{flex:1,height:"11px",background:T.surface,borderRadius:"3px",overflow:"hidden"}}><div style={{height:"100%",width:`${v/mx*100}%`,background:`linear-gradient(90deg,${MC[g]||T.sub}70,${MC[g]||T.sub}30)`,borderRadius:"3px"}}/></div><span style={{...ss.mono,color:T.sub,fontSize:"10px",width:"22px"}}>{v}</span></div>)}</div>}

// ── Exercise Row (improved layout with persistent notes) ──
function ExProg({name,ws,onClose}){
  const overlayRef=useRef(null);
  useEffect(()=>{if(overlayRef.current)overlayRef.current.scrollTop=0},[name]);
  const data=[];const bw=[];
  // Aggregate split sets: group by workout date, sum sets, take max weight
  ws.forEach(w=>{const hits=[];w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name===name)hits.push(e)}));if(!hits.length)return;
    const totalS=hits.reduce((a,e)=>a+(e.sets||1),0);const maxW=Math.max(...hits.map(e=>e.weight||0));const minW=Math.min(...hits.filter(e=>e.weight).map(e=>e.weight)||[0]);const reps=hits[0].reps;
    if(maxW>0)data.push({date:w.date,max:maxW,min:minW>0&&minW!==maxW?minW:null,sets:totalS,reps,type:w.type});
    else bw.push({date:w.date,sets:totalS,reps,type:w.type})});
  const all=[...data,...bw.map(d=>({...d,max:0}))].sort((a,b)=>a.date.localeCompare(b.date));
  const best=data.length?Math.max(...data.map(d=>d.max)):null;
  const recent=all.slice(-1)[0];
  const ms=(MM[name]||[]).filter(m=>m!=="Grip");
  return <div ref={overlayRef} style={{position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,0.25)",overflowY:"auto"}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{maxWidth:440,margin:"60px auto 20px",padding:"0 16px"}}>
      <div style={{background:T.card,borderRadius:"8px",border:`1px solid ${T.border}`,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",padding:"16px",overflow:"hidden"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
        <div><h3 style={{margin:0,fontSize:"16px",color:T.text}}>{name}</h3>
          {ms.length>0&&<div style={{display:"flex",gap:"3px",marginTop:"4px"}}>{ms.map(m=><Pill key={m} g={m}/>)}</div>}
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",color:T.sub,fontSize:"20px",cursor:"pointer",padding:"0"}}>×</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"12px"}}>
        <Stat v={all.length} l="Times Used" c={T.accent}/>
        <Stat v={best?`${best}#`:"BW"} l="Best Weight" c={T.green}/>
        <Stat v={recent?`${recent.sets}×${recent.reps}`:"-"} l="Last S×R" c={T.blue}/>
      </div>
      {data.length>2&&<div style={{background:T.surface,borderRadius:"8px",padding:"10px",marginBottom:"10px"}}><div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px"}}>WEIGHT PROGRESSION</div><Chart data={data} color={T.accent} h={100}/></div>}
      <div style={{background:T.surface,borderRadius:"8px",padding:"10px"}}>
        <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px"}}>FULL HISTORY ({all.length})</div>
        <div style={{display:"grid",gridTemplateColumns:"78px 40px 55px 50px 1fr",gap:"4px",padding:"4px 0",borderBottom:`1px solid ${T.border}`,marginBottom:"2px"}}>
          <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>DATE</span><span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>TYPE</span><span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>S × R</span><span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>WEIGHT</span><span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>DELTA</span>
        </div>
        {[...all].reverse().map((d,i,arr)=>{const prev=arr[i+1];const delta=d.max&&prev&&prev.max?(d.max-prev.max):null;
          return <div key={i} style={{display:"grid",gridTemplateColumns:"78px 40px 55px 50px 1fr",gap:"4px",padding:"3px 0",borderBottom:`1px solid ${T.border}10`,alignItems:"center"}}>
            <span style={{...ss.mono,color:T.sub,fontSize:"11px"}}>{new Date(d.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"2-digit"})}</span>
            <span style={{...ss.pill(TC[d.type]),fontSize:"9px"}}>{d.type}</span>
            <span style={{...ss.mono,color:T.text,fontSize:"11px"}}>{d.sets}×{d.reps}</span>
            <span style={{...ss.mono,color:d.max?T.accent:T.dim,fontSize:"11px",fontWeight:600}}>{d.max?(d.min?`${d.min}-${d.max}#`:`${d.max}#`):"BW"}</span>
            <span style={{...ss.mono,fontSize:"11px",fontWeight:600,color:delta>0?T.green:delta<0?T.red:T.dim}}>{delta>0?`+${delta}`:delta<0?`${delta}`:delta===0?"—":""}</span>
          </div>})}
      </div>
      </div>
    </div>
  </div>;
}

function ExRow({ex,bi,ei,live,editing,isDone,isProposed,ms,upEx,delEx,splitEx,onExClick,allExNames}){
  const showCheck=live&&!editing&&!isProposed;
  const showInputs=live||isProposed;
  const canSplit=live&&!isProposed&&(ex.sets||1)>1;
  const nameEditable=isProposed||(live&&ex.name==="New Exercise");
  const[acOpen,setAcOpen]=useState(false);
  const[acSearch,setAcSearch]=useState("");
  const acFiltered=acOpen&&acSearch.length>0&&allExNames?allExNames.filter(n=>n.toLowerCase().includes(acSearch.toLowerCase())&&n!==ex.name).slice(0,8):[];
  const pickName=(name)=>{upEx(bi,ei,"name",name);setAcOpen(false);setAcSearch("")};
  return <div style={{padding:"8px 14px",borderBottom:`1px solid ${T.border}12`,opacity:showCheck&&isDone?.5:1,background:showCheck&&isDone?T.green+"06":"transparent"}}>
    <div style={{display:"grid",gridTemplateColumns:showCheck?"26px 1fr auto":"1fr auto",gap:"8px",alignItems:"center"}}>
      {showCheck&&<button onClick={()=>upEx(bi,ei,"done",!isDone)} style={{width:24,height:24,borderRadius:"6px",border:`2px solid ${isDone?T.green:T.border}`,background:isDone?T.green+"25":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",color:T.green,flexShrink:0,padding:0}}>{isDone?"✓":""}</button>}
      <div style={{minWidth:0,position:"relative"}}>
        {nameEditable?<>
          <input style={{...ss.inp,width:"100%",fontSize:"13px",fontWeight:500,padding:"4px 6px",boxSizing:"border-box"}} value={acOpen?acSearch:ex.name}
            onFocus={()=>{setAcOpen(true);setAcSearch(ex.name==="New Exercise"?"":ex.name)}}
            onChange={e=>{setAcSearch(e.target.value);setAcOpen(true);upEx(bi,ei,"name",e.target.value)}}
            onBlur={()=>setTimeout(()=>setAcOpen(false),200)}
            placeholder="Exercise name..."/>
          {acFiltered.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:T.card,border:`1px solid ${T.border}`,borderRadius:"0 0 6px 6px",maxHeight:"180px",overflowY:"auto",zIndex:99,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>
            {acFiltered.map(n=>{const nms=(MM[n]||[]).filter(m=>m!=="Grip");return <div key={n} onMouseDown={e=>e.preventDefault()} onClick={()=>pickName(n)} style={{padding:"6px 8px",cursor:"pointer",fontSize:"12px",color:T.text,borderBottom:`1px solid ${T.border}18`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span>{n}</span>
              {nms.length>0&&<div style={{display:"flex",gap:"2px"}}>{nms.slice(0,2).map(m=><Pill key={m} g={m}/>)}</div>}
            </div>})}
          </div>}
        </>
        :<div style={{color:T.text,fontSize:"13px",fontWeight:500,textDecoration:showCheck&&isDone?"line-through":"none",cursor:onExClick?"pointer":"default"}} onClick={()=>onExClick&&onExClick(ex.name)}>{ex.name}</div>}
        {ms.length>0&&!acOpen&&<div style={{display:"flex",gap:"3px",flexWrap:"wrap",marginTop:"2px"}}>{ms.slice(0,3).map(m=><Pill key={m} g={m}/>)}</div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"6px",flexShrink:0}}>
        {showInputs?<>
          <input style={{...ss.inp,width:"42px"}} value={ex.sets??""} onChange={e=>upEx(bi,ei,"sets",e.target.value)} disabled={showCheck&&isDone}/>
          <span style={{color:T.dim,fontSize:"12px"}}>×</span>
          <input style={{...ss.inp,width:"42px"}} value={ex.reps??""} onChange={e=>upEx(bi,ei,"reps",e.target.value)} disabled={showCheck&&isDone}/>
          <input style={{...ss.inp,width:"52px"}} value={ex.weight??""} onChange={e=>upEx(bi,ei,"weight",e.target.value)} placeholder="BW" disabled={showCheck&&isDone}/>
          <button onClick={()=>delEx(bi,ei)} style={{background:"none",border:"none",color:T.red+"80",cursor:"pointer",fontSize:"18px",padding:"0 4px",fontWeight:700,lineHeight:1}}>×</button>
        </>:<div style={{display:"flex",alignItems:"baseline",gap:"8px"}}>
          <span style={{...ss.mono,color:T.accent,fontSize:"13px",fontWeight:700,whiteSpace:"nowrap"}}>{ex.sets}×{ex.reps}</span>
          <span style={{...ss.mono,color:ex.weight?T.text:T.dim,fontSize:"13px",fontWeight:600,whiteSpace:"nowrap"}}>{ex.weight?`${ex.weight}#`:"BW"}</span>
        </div>}
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:ex.notes||canSplit||isProposed?"3px":"0",paddingLeft:showCheck?"34px":"0"}}>
      {isProposed?<input style={{...ss.inp,width:"100%",fontSize:"11px",padding:"3px 6px",fontStyle:"italic",boxSizing:"border-box"}} value={ex.notes||""} onChange={e=>upEx(bi,ei,"notes",e.target.value)} placeholder="Notes..."/>
      :ex.notes?<span style={{color:T.dim,fontSize:"11px",fontStyle:"italic",flex:1}}>{ex.notes}</span>:null}
      {canSplit&&!isDone&&<button onClick={()=>splitEx(bi,ei)} style={{background:T.accent+"12",border:`1px solid ${T.accent}30`,color:T.accent,fontSize:"10px",fontWeight:600,padding:"2px 7px",borderRadius:"4px",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0}}>⇅ Split Sets</button>}
    </div>
  </div>;
}

function WCard({w,open,toggle,live,onChange,onAction,pinned,onTogglePin,onExClick,editing,onEdit,onEditSave,onEditCancel,onDelete,allExNames}){
  const sets=w.blocks.reduce((a,b)=>a+b.exercises.reduce((s2,e)=>s2+(e.sets||0),0),0);
  const vol=w.blocks.reduce((a,b)=>a+b.exercises.reduce((s2,e)=>s2+((e.sets||0)*(e.reps||0)*(e.weight||0)),0),0);
  const dt=new Date(w.date+"T12:00:00");
  const dl=dt.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});
  const tc=TC[w.type]||T.sub;
  const isP=w.status==="proposed",isL=w.status==="in-progress",isC=w.status==="completed";
  const canEdit=editing||live||isP;
  const upEx=(bi,ei,f,v)=>{if(!onChange)return;const nw=JSON.parse(JSON.stringify(w));nw.blocks[bi].exercises[ei][f]=f==="weight"||f==="reps"||f==="sets"?(v===""?null:Number(v)):v;onChange(nw)};
  const delEx=(bi,ei)=>{if(!onChange)return;const nw=JSON.parse(JSON.stringify(w));nw.blocks[bi].exercises.splice(ei,1);if(nw.blocks[bi].exercises.length===0)nw.blocks.splice(bi,1);onChange(nw)};
  const splitEx=(bi,ei)=>{if(!onChange)return;const nw=JSON.parse(JSON.stringify(w));const ex=nw.blocks[bi].exercises[ei];const n=ex.sets||1;if(n<=1)return;const rows=[];for(let i=0;i<n;i++){rows.push({...ex,sets:1,notes:i===0?(ex.notes||"")+"":ex.notes||"",done:false})}nw.blocks[bi].exercises.splice(ei,1,...rows);onChange(nw)};
  const pinKey=(bi,ei)=>`${bi}-${ei}`;
  const hasPins=pinned&&Object.values(pinned).some(v=>v);
  const rpeColors=["","","","","","","#22C55E","#22C55E","#F97316","#EF4444","#DC2626"];
  const[confirmDel,setConfirmDel]=useState(false);
  const[copied,setCopied]=useState(false);
  const copyW=()=>{try{navigator.clipboard.writeText(workoutToText(w));setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}};
  // Reorder mode
  const[reorder,setReorder]=useState(false);
  const dragRef=useRef(null);
  const rowRefs=useRef({});
  const moveBlock=(bi,dir)=>{if(!onChange)return;const nw=JSON.parse(JSON.stringify(w));const ti=bi+dir;if(ti<0||ti>=nw.blocks.length)return;[nw.blocks[bi],nw.blocks[ti]]=[nw.blocks[ti],nw.blocks[bi]];onChange(nw)};
  const moveEx=(bi,ei,dir)=>{if(!onChange)return;const nw=JSON.parse(JSON.stringify(w));const exs=nw.blocks[bi].exercises;const ti=ei+dir;if(ti<0||ti>=exs.length)return;[exs[ei],exs[ti]]=[exs[ti],exs[ei]];onChange(nw)};
  // Global touch drag
  useEffect(()=>{if(!reorder)return;
    const onMove=(e)=>{const d=dragRef.current;if(!d)return;e.preventDefault();const t=e.touches[0];const dy=t.clientY-d.startY;d.el.style.transform=`translateY(${dy}px)`;d.moved=true};
    const onEnd=()=>{const d=dragRef.current;if(!d)return;d.el.style.transition="transform 0.15s";d.el.style.transform="";d.el.style.zIndex="";d.el.style.opacity="";d.el.style.boxShadow="";
      if(d.moved&&onChange){const rect=d.el.getBoundingClientRect();const cy=rect.top+rect.height/2;const exs=w.blocks[d.bi]?.exercises||[];let best=-1,bestDist=Infinity;exs.forEach((_,i)=>{const ref=rowRefs.current[`${d.bi}-${i}`];if(!ref)return;const r=ref.getBoundingClientRect();const mid=r.top+r.height/2;if(Math.abs(cy-mid)<bestDist){bestDist=Math.abs(cy-mid);best=i}});
        if(best>=0&&best!==d.ei){const nw=JSON.parse(JSON.stringify(w));const arr=nw.blocks[d.bi].exercises;const[item]=arr.splice(d.ei,1);arr.splice(best,0,item);onChange(nw)}}
      dragRef.current=null};
    document.addEventListener("touchmove",onMove,{passive:false});document.addEventListener("touchend",onEnd);document.addEventListener("touchcancel",onEnd);
    return()=>{document.removeEventListener("touchmove",onMove);document.removeEventListener("touchend",onEnd);document.removeEventListener("touchcancel",onEnd)};
  },[reorder,w,onChange]);
  const onGripStart=(bi,ei,e)=>{if(!reorder)return;const el=e.currentTarget.closest('[data-exrow]');if(!el)return;const t=e.touches[0];dragRef.current={bi,ei,startY:t.clientY,el,moved:false};el.style.transition="none";el.style.zIndex="10";el.style.opacity="0.9";el.style.boxShadow="0 4px 12px rgba(0,0,0,0.15)"};

  return <div style={{background:isL?T.green+"04":isP?T.accent+"04":editing?T.blue+"04":T.card,border:`1px solid ${isL?T.green+"40":isP?T.accent+"30":editing?T.blue+"40":T.border}`,borderRadius:"8px",overflow:"hidden",marginBottom:"8px"}}>
    <div onClick={toggle} style={{padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"3px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"5px",flexWrap:"wrap"}}>
          {isL&&<span style={{background:T.green,color:T.bg,padding:"2px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:800,letterSpacing:"1px"}}>● LIVE</span>}
          {isP&&<span style={{background:T.accent,color:T.bg,padding:"2px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:800,letterSpacing:"1px"}}>AI PROPOSED</span>}
          {editing&&<span style={{background:T.blue,color:T.bg,padding:"2px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:800,letterSpacing:"1px"}}>EDITING</span>}
          <span style={{background:tc+"18",color:tc,padding:"2px 6px",borderRadius:"4px",fontSize:"10px",fontWeight:700,textTransform:"uppercase"}}>{w.type}</span>
          <span style={{color:T.text,fontWeight:600,fontSize:"13px"}}>{w.label}</span>
          {w.rpe&&<span style={{...ss.mono,background:(rpeColors[w.rpe]||T.dim)+"20",color:rpeColors[w.rpe]||T.dim,padding:"1px 5px",borderRadius:"4px",fontSize:"10px",fontWeight:700}}>RPE {w.rpe}</span>}
        </div>
        <span style={{...ss.mono,color:T.sub,fontSize:"11px"}}>{dl} · {sets} sets{vol>0?` · ${(vol/1000).toFixed(1)}k vol`:""}{hasPins?" · pinned":""}</span>
        {w.phase&&<div style={{display:"flex",gap:"4px",marginTop:"3px"}}><span style={{background:(({low:T.green,moderate:T.accent,high:T.red,max:"#DC2626"})[w.phase.intensity]||T.accent)+"15",color:(({low:T.green,moderate:T.accent,high:T.red,max:"#DC2626"})[w.phase.intensity]||T.accent),fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"3px"}}>{w.phase.name} Wk{w.phase.week}/{w.phase.totalWeeks}{w.phase.repRange?` · ${w.phase.repRange} reps`:""}</span></div>}
      </div>
      <span style={{color:T.sub,fontSize:"16px",transition:"transform .2s",transform:open?"rotate(180deg)":"rotate(0)"}}>▾</span>
    </div>
    {open&&<div style={{borderTop:`1px solid ${T.border}`}}>
      <div style={{padding:"6px 14px",background:T.surface}}><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:"1px"}}>Warmup: </span><span style={{color:T.sub,fontSize:"11px"}}>{w.warmup}</span></div>
      {w.blocks.map((bl,bi)=><div key={bi} style={{borderTop:bi?`1px solid ${T.border}18`:"none"}}>
        <div style={{padding:"6px 14px 3px",background:T.surface+"80",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:".4px",textTransform:"uppercase",flex:1}}>{bl.name}</span>
          {reorder&&<div style={{display:"flex",gap:"2px"}}>
            <button onClick={()=>moveBlock(bi,-1)} disabled={bi===0} style={{background:"none",border:"none",color:bi===0?T.border:T.accent,fontSize:"16px",cursor:"pointer",padding:"2px 6px",lineHeight:1}}>↑</button>
            <button onClick={()=>moveBlock(bi,1)} disabled={bi===w.blocks.length-1} style={{background:"none",border:"none",color:bi===w.blocks.length-1?T.border:T.accent,fontSize:"16px",cursor:"pointer",padding:"2px 6px",lineHeight:1}}>↓</button>
          </div>}
        </div>
        {bl.exercises.map((ex,ei)=>{const ms=(MM[ex.name]||[]).filter(m=>m!=="Grip");const pk=pinKey(bi,ei);const isPinned=pinned&&pinned[pk];
          return <div key={ei} data-exrow ref={el=>{rowRefs.current[`${bi}-${ei}`]=el}} style={{display:"flex",alignItems:"flex-start",gap:"0",position:"relative",background:T.card}}>
            {reorder&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4px 2px 4px 6px",gap:"0",flexShrink:0,touchAction:"none"}}
              onTouchStart={e=>onGripStart(bi,ei,e)}>
              <button onClick={()=>moveEx(bi,ei,-1)} disabled={ei===0} style={{background:"none",border:"none",color:ei===0?T.border:T.sub,fontSize:"12px",cursor:"pointer",padding:"1px 4px",lineHeight:1}}>▲</button>
              <span style={{color:T.dim,fontSize:"11px",cursor:"grab",padding:"2px 4px",userSelect:"none"}}>☰</span>
              <button onClick={()=>moveEx(bi,ei,1)} disabled={ei===bl.exercises.length-1} style={{background:"none",border:"none",color:ei===bl.exercises.length-1?T.border:T.sub,fontSize:"12px",cursor:"pointer",padding:"1px 4px",lineHeight:1}}>▼</button>
            </div>}
            {isP&&!reorder&&onTogglePin&&<button onClick={(e)=>{e.stopPropagation();onTogglePin(pk)}} style={{background:"none",border:"none",cursor:"pointer",padding:"8px 2px 8px 10px",fontSize:"13px",flexShrink:0,color:isPinned?T.accent:T.dim,opacity:isPinned?1:0.4}}>{isPinned?"●":"○"}</button>}
            <div style={{flex:1}}><ExRow ex={ex} bi={bi} ei={ei} live={canEdit} editing={editing} isDone={!editing&&ex.done} isProposed={isP} ms={ms} upEx={upEx} delEx={delEx} splitEx={splitEx} onExClick={onExClick} allExNames={allExNames}/></div>
          </div>;
        })}
        {(isP||isL)&&onChange&&<button onClick={()=>{const nw=JSON.parse(JSON.stringify(w));nw.blocks[bi].exercises.push({name:"New Exercise",sets:3,reps:10,weight:null,notes:"",done:false});onChange(nw)}} style={{background:"none",border:"none",color:isL?T.green:T.accent,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",padding:"4px 14px 6px",fontWeight:600,opacity:0.7}}>+ Add exercise</button>}
      </div>)}
      {w.reasoning&&<div style={{padding:"10px 14px",background:T.accent+"06",borderTop:`1px solid ${T.accent}15`}}><div style={{color:T.accent,fontSize:"10px",fontWeight:700,letterSpacing:"1px",marginBottom:"3px"}}>AI RATIONALE</div><p style={{color:T.sub,fontSize:"11px",margin:0,lineHeight:1.5}}>{w.reasoning}</p></div>}
      {isC&&w.trainerNotes&&<div style={{padding:"8px 14px",background:T.blue+"08",borderTop:`1px solid ${T.blue}15`}}><span style={{color:T.blue,fontSize:"10px",fontWeight:700,letterSpacing:"1px"}}>📝 TRAINER NOTES: </span><span style={{color:T.sub,fontSize:"11px"}}>{w.trainerNotes}</span></div>}
      {isC&&w.readiness&&(w.readiness.sleep||w.readiness.soreness||w.readiness.energy)&&<div style={{padding:"6px 14px",background:T.purple+"08",borderTop:`1px solid ${T.purple}15`,display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
        <span style={{color:T.purple,fontSize:"10px",fontWeight:700,letterSpacing:"1px"}}>CHECK-IN:</span>
        {w.readiness.sleep&&<span style={{color:T.sub,fontSize:"11px"}}>Sleep {w.readiness.sleep}/5</span>}
        {w.readiness.soreness&&<span style={{color:T.sub,fontSize:"11px"}}>Sore {w.readiness.soreness}/5</span>}
        {w.readiness.energy&&<span style={{color:T.sub,fontSize:"11px"}}>Energy {w.readiness.energy}/5</span>}
        {w.readiness.note&&<span style={{color:T.dim,fontSize:"11px",fontStyle:"italic"}}>{w.readiness.note}</span>}
      </div>}
      {isP&&onTogglePin&&<div style={{padding:"6px 14px",background:T.surface,borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:T.dim,fontSize:"11px"}}>{reorder?"Tap arrows or drag ☰ to reorder":"Pin exercises to keep them on regenerate"}</span>
        <button onClick={()=>setReorder(r=>!r)} style={{background:reorder?T.accent+"15":"none",border:`1px solid ${reorder?T.accent:T.border}`,color:reorder?T.accent:T.sub,padding:"3px 8px",borderRadius:"4px",fontSize:"10px",fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{reorder?"✓ Done":"↕ Reorder"}</button>
      </div>}
      {isC&&editing&&<div style={{padding:"10px 14px",borderTop:`1px solid ${T.blue}20`,background:T.blue+"06"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 80px 60px",gap:"6px",marginBottom:"8px"}}>
          <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Date</label><input type="date" style={{...ss.inp,width:"100%"}} value={w.date} onChange={e=>onChange({...w,date:e.target.value})}/></div>
          <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Type</label><select style={{...ss.inp,width:"100%",appearance:"auto"}} value={w.type} onChange={e=>onChange({...w,type:e.target.value})}>{["quad","lower","glute","upper","push","pull","full"].map(t=><option key={t} value={t}>{t}</option>)}</select></div>
          <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>RPE</label><select style={{...ss.inp,width:"100%",appearance:"auto"}} value={w.rpe||""} onChange={e=>onChange({...w,rpe:e.target.value?Number(e.target.value):null})}><option value="">—</option>{[6,7,8,9,10].map(r=><option key={r} value={r}>{r}</option>)}</select></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"8px"}}>
          <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Label</label><input style={{...ss.inp,width:"100%"}} value={w.label} onChange={e=>onChange({...w,label:e.target.value})}/></div>
          <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Warmup</label><input style={{...ss.inp,width:"100%"}} value={w.warmup||""} onChange={e=>onChange({...w,warmup:e.target.value})}/></div>
        </div>
        <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Trainer Notes</label>
        <input style={{...ss.inp,width:"100%",boxSizing:"border-box",marginBottom:"8px"}} value={w.trainerNotes||""} onChange={e=>onChange({...w,trainerNotes:e.target.value})} placeholder="Session notes..."/>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={onEditSave} style={{...ss.btn(true),background:T.blue,borderColor:T.blue}}>💾 Save Changes</button>
          <button onClick={onEditCancel} style={{...ss.btn(false)}}>Cancel</button>
        </div>
      </div>}
      {isC&&!editing&&open&&<div style={{padding:"8px 14px",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"flex-end",gap:"8px"}}>
        <button onClick={copyW} style={{background:"none",border:"none",color:copied?T.green:T.cyan,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{copied?"✓ Copied":"Copy"}</button>
        {onEdit&&<button onClick={onEdit} style={{background:"none",border:"none",color:T.blue,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>Edit</button>}
        {onDelete&&!confirmDel&&<button onClick={()=>setConfirmDel(true)} style={{background:"none",border:"none",color:T.red,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>🗑 Delete</button>}
        {confirmDel&&<div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{color:T.red,fontSize:"11px",fontWeight:600}}>Delete this workout?</span><button onClick={()=>{onDelete();setConfirmDel(false)}} style={{...ss.btn(false),color:T.red,borderColor:T.red,fontSize:"11px",padding:"3px 10px"}}>Yes, delete</button><button onClick={()=>setConfirmDel(false)} style={{...ss.btn(false),fontSize:"11px",padding:"3px 10px"}}>No</button></div>}
      </div>}
      {(isP||isL)&&onAction&&<div style={{padding:"10px 14px",display:"flex",gap:"8px",borderTop:`1px solid ${T.border}`,flexDirection:"column"}}>
        {isL&&<div>
          <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px"}}>
            <span style={{color:T.dim,fontSize:"11px",fontWeight:600,flexShrink:0}}>RPE:</span>
            {[6,7,8,9,10].map(r=><button key={r} onClick={()=>onChange({...w,rpe:w.rpe===r?null:r})} style={{width:28,height:24,borderRadius:"4px",border:`1px solid ${w.rpe===r?(rpeColors[r]||T.dim):T.border}`,background:w.rpe===r?(rpeColors[r]||T.dim)+"20":"transparent",color:w.rpe===r?(rpeColors[r]||T.dim):T.dim,fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{r}</button>)}
          </div>
          <input value={w.trainerNotes||""} onChange={e=>onChange({...w,trainerNotes:e.target.value})} placeholder="Session notes — energy, modifications, cues for next time..." style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"7px 10px",borderRadius:"6px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box",marginBottom:"8px"}}/>
        </div>}
        <div style={{display:"flex",gap:"8px"}}>
          {isP&&<button style={ss.btn(true)} onClick={()=>onAction("start",w)}>▶ Start Workout</button>}
          {isP&&<button onClick={copyW} style={{...ss.btn(false),color:copied?T.green:T.cyan}}>{copied?"✓ Copied":"Copy"}</button>}
          {isL&&<button style={{...ss.btn(true),background:T.green,borderColor:T.green}} onClick={()=>onAction("complete",w)}>✓ Complete & Save</button>}
          {isL&&<button style={{...ss.btn(false),color:T.red}} onClick={()=>onAction("cancel",w)}>Cancel</button>}
        </div>
      </div>}
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════════════════════
//  VIEWS
// ═══════════════════════════════════════════════════════════════
// Program / Mesocycle helpers
function getCurrentPhase(program,type){
  if(!program?.enabled||!program.blocks?.length||!program.startDate)return null;
  const start=new Date(program.startDate+"T12:00:00"),now=new Date();
  const daysSince=Math.floor((now-start)/(86400000));
  const totalWeeks=program.blocks.reduce((a,b)=>a+b.weeks,0);
  if(daysSince<0)return{upcoming:true,block:program.blocks[0],blockIndex:0,weekInBlock:0,daysUntilStart:-daysSince,totalWeeks};
  const weeksSince=Math.floor(daysSince/7);
  let wk=0;
  for(let i=0;i<program.blocks.length;i++){const b=program.blocks[i];if(weeksSince<wk+b.weeks){
    // Merge type-specific overrides if present
    const ov=type&&b.typeOverrides&&b.typeOverrides[type]?b.typeOverrides[type]:{};
    const merged={...b,repRange:ov.repRange||b.repRange,intensity:ov.intensity||b.intensity,notes:[b.notes,ov.notes].filter(Boolean).join(". "),volumeNote:ov.volumeNote||b.volumeNote};
    return{blockIndex:i,block:merged,rawBlock:b,weekInBlock:weeksSince-wk+1,weekTotal:weeksSince+1,totalWeeks};
  }wk+=b.weeks}
  return{completed:true,totalWeeks:wk};
}

function useForge(){
  const[clients,setCl]=useState([]);const[workouts,setWs]=useState({});const[proposals,setProps]=useState({});const[loading,setL]=useState(true);const init=useRef(false);
  const load=useCallback(async()=>{if(init.current)return;init.current=true;const ver=await S.get("forge:ver");if(!ver){await S.set("forge:ver",17);const cls=[SEED_CLIENT_PAT,SEED_CLIENT_RACHEL,SEED_CLIENT_ANGELA,SEED_CLIENT_ADAM,SEED_CLIENT_DEANNA,SEED_CLIENT_KERIE,SEED_CLIENT_BILLY];await S.set("forge:clients",cls);await S.set("forge:w:pat",SEED_PAT);await S.set("forge:w:rachel",SEED_RACHEL);await S.set("forge:w:angela",SEED_ANGELA);await S.set("forge:w:adam",SEED_ADAM);await S.set("forge:w:deanna",SEED_DEANNA);await S.set("forge:w:kerie",SEED_KERIE);await S.set("forge:w:billy",SEED_BILLY)}
    // Migrate: patch scheduleDays + add missing Pat Feb workouts + add Kerie
    if(ver&&ver<17){await S.set("forge:ver",17);const seedMap={pat:SEED_CLIENT_PAT,rachel:SEED_CLIENT_RACHEL,angela:SEED_CLIENT_ANGELA,adam:SEED_CLIENT_ADAM,deanna:SEED_CLIENT_DEANNA};let cls=await S.get("forge:clients");if(cls){cls=cls.map(c=>{const seed=seedMap[c.id];if(seed&&!c.scheduleDays){return{...c,scheduleDays:seed.scheduleDays||[],scheduleNotes:seed.scheduleNotes||c.schedulePattern||""}}return c});
      // Add Kerie if not present
      if(!cls.find(c=>c.id==="kerie")){cls.push(SEED_CLIENT_KERIE);await S.set("forge:w:kerie",SEED_KERIE)}
      // Add Billy & Alli if not present
      if(!cls.find(c=>c.id==="billy")){cls.push(SEED_CLIENT_BILLY);await S.set("forge:w:billy",SEED_BILLY)}
      await S.set("forge:clients",cls)}
      // Add missing Pat Feb workouts if not already present
      let patWs=await S.get("forge:w:pat");if(patWs){const existing=new Set(patWs.map(w=>w.date));const febWs=SEED_PAT.filter(w=>w.date>="2026-02-01"&&!existing.has(w.date));if(febWs.length>0){patWs=[...patWs,...febWs].sort((a,b)=>a.date.localeCompare(b.date));await S.set("forge:w:pat",patWs)}}
    }
    let cls=await S.get("forge:clients");if(!cls||!cls.length){const d=[SEED_CLIENT_PAT,SEED_CLIENT_RACHEL,SEED_CLIENT_ANGELA,SEED_CLIENT_ADAM,SEED_CLIENT_DEANNA,SEED_CLIENT_KERIE,SEED_CLIENT_BILLY];cls=d;await S.set("forge:clients",d);await S.set("forge:w:pat",SEED_PAT);await S.set("forge:w:rachel",SEED_RACHEL);await S.set("forge:w:angela",SEED_ANGELA);await S.set("forge:w:adam",SEED_ADAM);await S.set("forge:w:deanna",SEED_DEANNA);await S.set("forge:w:kerie",SEED_KERIE);await S.set("forge:w:billy",SEED_BILLY)}setCl(cls);const wm={};const pm={};for(const c of cls){wm[c.id]=await S.get(`forge:w:${c.id}`)||[];pm[c.id]=await S.get(`forge:p:${c.id}`)||[]}setWs(wm);setProps(pm);setL(false)},[]);
  useEffect(()=>{load()},[load]);
  const saveW=async(cid,w)=>{const ws=[...(workouts[cid]||[])];const i=ws.findIndex(x=>x.id===w.id);if(i>=0)ws[i]=w;else ws.push(w);ws.sort((a,b)=>a.date.localeCompare(b.date));setWs(p=>({...p,[cid]:ws}));await S.set(`forge:w:${cid}`,ws)};
  const deleteW=async(cid,wid)=>{const ws=(workouts[cid]||[]).filter(x=>x.id!==wid);setWs(p=>({...p,[cid]:ws}));await S.set(`forge:w:${cid}`,ws)};
  const saveCl=async(cl)=>{const i=clients.findIndex(c=>c.id===cl.id);const nc=i>=0?clients.map(c=>c.id===cl.id?cl:c):[...clients,cl];setCl(nc);await S.set("forge:clients",nc);if(i<0){setWs(p=>({...p,[cl.id]:[]}));await S.set(`forge:w:${cl.id}`,[]);setProps(p=>({...p,[cl.id]:[]}));await S.set(`forge:p:${cl.id}`,[])}};
  const saveProposals=async(cid,pArr)=>{setProps(p=>({...p,[cid]:pArr}));await S.set(`forge:p:${cid}`,pArr)};
  const clearProposals=async(cid)=>{setProps(p=>({...p,[cid]:[]}));await S.set(`forge:p:${cid}`,[])};
  return{clients,workouts,proposals,loading,saveW,deleteW,saveCl,saveProposals,clearProposals};
}

function Dashboard({clients,workouts,proposals,onNav}){
  const dayMap={"Sun":"SU","Mon":"M","Tue":"T","Wed":"W","Thu":"TH","Fri":"F","Sat":"S"};
  const dayNames={SU:"Sunday",M:"Monday",T:"Tuesday",W:"Wednesday",TH:"Thursday",F:"Friday",S:"Saturday"};
  const dayOrder=["SU","M","T","W","TH","F","S"];
  const todayKey=dayMap[new Date().toLocaleDateString("en-US",{weekday:"short"})];
  const today=new Date().toISOString().slice(0,10);
  const todayClients=clients.filter(c=>(c.scheduleDays||[]).includes(todayKey));
  const daysSince=(ws)=>{if(!ws.length)return null;const last=ws[ws.length-1].date;const diff=Math.floor((new Date(today+"T12:00:00")-new Date(last+"T12:00:00"))/86400000);return diff};
  const totalSessions=Object.values(workouts).reduce((a,ws)=>a+ws.length,0);
  const thisWeek=Object.values(workouts).reduce((a,ws)=>a+ws.filter(w=>{const d=new Date(w.date+"T12:00:00");const now=new Date();const weekAgo=new Date(now);weekAgo.setDate(now.getDate()-7);return d>=weekAgo}).length,0);

  return <div><div style={ss.header}><h1 style={{margin:0,fontSize:"20px",fontWeight:700,letterSpacing:"-.4px"}}><span style={{color:T.accent}}>FORGE</span> <span style={{fontWeight:400,color:T.sub}}>Training</span><span style={{fontSize:"11px",color:T.cyan,marginLeft:"8px",fontWeight:500}}>AI</span></h1><p style={{margin:"3px 0 0",color:T.dim,fontSize:"11px"}}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p></div>
  <div style={ss.content}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"12px"}}>
      <div style={{...ss.card,textAlign:"center",padding:"10px 6px",marginBottom:0}}><div style={{...ss.mono,color:T.accent,fontSize:"20px",fontWeight:700}}>{clients.length}</div><div style={{color:T.dim,fontSize:"10px"}}>Clients</div></div>
      <div style={{...ss.card,textAlign:"center",padding:"10px 6px",marginBottom:0}}><div style={{...ss.mono,color:T.blue,fontSize:"20px",fontWeight:700}}>{totalSessions}</div><div style={{color:T.dim,fontSize:"10px"}}>Total Sessions</div></div>
      <div style={{...ss.card,textAlign:"center",padding:"10px 6px",marginBottom:0}}><div style={{...ss.mono,color:T.green,fontSize:"20px",fontWeight:700}}>{thisWeek}</div><div style={{color:T.dim,fontSize:"10px"}}>This Week</div></div>
    </div>

    {todayClients.length>0&&<>
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>TODAY'S SESSIONS</div>
      {todayClients.map(c=>{const ws=workouts[c.id]||[];const last=ws.length?ws[ws.length-1]:null;const lastType=last?last.type:"";const nextTypes=(c.workoutTypes||[]).length>0?c.workoutTypes:["full"];const cs=clientStats(ws,c.scheduleDays);const cProps=proposals[c.id]||[];const planned=cProps.length;
        return <div key={c.id+"today"} onClick={()=>onNav("client",c.id,"next")} style={{...ss.card,cursor:"pointer",border:`1px solid ${T.accent}30`,background:T.accent+"04"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:44,height:44,borderRadius:"8px",background:c.color||T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",fontWeight:700,color:T.bg,flexShrink:0}}>{c.name[0]}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{color:T.text,fontWeight:700,fontSize:"15px"}}>{c.fullName||c.name}</span>{cs.streak>=2&&<span style={{...ss.mono,background:T.green+"15",color:T.green,padding:"1px 5px",borderRadius:"4px",fontSize:"10px",fontWeight:700}}>{cs.streak}w</span>}{planned>0&&<span style={{background:T.green+"15",color:T.green,fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"4px"}}>planned</span>}</div>
              <div style={{color:T.sub,fontSize:"11px",marginTop:"2px"}}>{ws.length} sessions{last?` · Last: ${lastType}`:""}{cs.adherence!==null?` · ${cs.adherence}% adherence`:""}{(c.considerations||[]).filter(x=>x.active).length>0?` · ${(c.considerations||[]).filter(x=>x.active).length}`:""}</div>
              <div style={{display:"flex",gap:"3px",marginTop:"4px"}}>{nextTypes.map(t=><span key={t} style={{...ss.pill(TC[t]),fontSize:"10px"}}>{t}</span>)}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{background:T.accent,color:"#fff",padding:"5px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:700,letterSpacing:".3px"}}>GO →</div>
            </div>
          </div>
        </div>})}
    </>}

    {todayClients.length===0&&<div style={{...ss.card,textAlign:"center",padding:"16px",border:`1px solid ${T.border}`,marginBottom:"10px"}}>
      <div style={{color:T.dim,fontSize:"12px"}}>No sessions scheduled for today</div>
      <div style={{color:T.dim,fontSize:"11px",marginTop:"2px"}}>Set training days in each client's profile</div>
    </div>}

    {/* Upcoming Sessions - next 7 days */}
    {(()=>{
      const upcoming=[];
      for(let d=1;d<=7;d++){
        const dt=new Date();dt.setDate(dt.getDate()+d);
        const key=dayOrder[dt.getDay()];
        const dateStr=dt.toISOString().slice(0,10);
        const dayLabel=dt.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});
        const scheduled=clients.filter(c=>(c.scheduleDays||[]).includes(key));
        if(scheduled.length>0)upcoming.push({dateStr,dayLabel,key,clients:scheduled});
      }
      if(!upcoming.length)return null;
      return <>
        <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px",marginTop:"4px"}}>📅 UPCOMING SESSIONS</div>
        {upcoming.map(day=><div key={day.dateStr} style={{marginBottom:"8px"}}>
          <div style={{color:T.dim,fontSize:"10px",fontWeight:700,letterSpacing:".5px",marginBottom:"5px",paddingLeft:"2px"}}>{day.dayLabel.toUpperCase()}</div>
          {day.clients.map(c=>{
            const ws=workouts[c.id]||[];const last=ws.length?ws[ws.length-1]:null;
            const cProps=proposals[c.id]||[];const planned=cProps.length;
            const cs=clientStats(ws,c.scheduleDays);
            return <div key={c.id+day.dateStr} onClick={()=>onNav("client",c.id,"next")} style={{...ss.card,cursor:"pointer",marginBottom:"4px",padding:"10px 12px",border:`1px solid ${planned?T.green+"30":T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div style={{width:36,height:36,borderRadius:"8px",background:c.color||T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",fontWeight:700,color:T.bg,flexShrink:0}}>{c.name[0]}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{color:T.text,fontWeight:600,fontSize:"13px"}}>{c.fullName||c.name}</span>
                    {planned>0&&<span style={{background:T.green+"15",color:T.green,fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"3px"}}>✓ {planned} planned</span>}
                    {!planned&&<span style={{background:T.accent+"12",color:T.accent,fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"3px"}}>needs plan</span>}
                  </div>
                  <div style={{color:T.sub,fontSize:"11px",marginTop:"1px"}}>{ws.length} sessions{last?` · Last: ${last.type}`:""}{cs.adherence!==null?` · ${cs.adherence}%`:""}</div>
                </div>
                <div style={{color:planned?T.green:T.accent,fontSize:"11px",fontWeight:700,flexShrink:0}}>{planned?"VIEW →":"PLAN →"}</div>
              </div>
            </div>})}
        </div>)}
      </>;
    })()}

    {(()=>{const others=clients.filter(c=>!todayClients.some(tc=>tc.id===c.id));return others.length>0&&<>
    <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px",marginTop:"4px"}}>{todayClients.length>0?"OTHER CLIENTS":"ALL CLIENTS"}</div>
    {others.map(c=>{const ws=workouts[c.id]||[];const tc={};ws.forEach(w=>{tc[w.type]=(tc[w.type]||0)+1});const last=ws.length?new Date(ws[ws.length-1].date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):"—";
      const ds=daysSince(ws);const isOverdue=ds!==null&&ds>=7;const cs=clientStats(ws,c.scheduleDays);
      return <div key={c.id} onClick={()=>onNav("client",c.id)} style={{...ss.card,cursor:"pointer",display:"flex",alignItems:"center",gap:"12px"}}>
        <div style={{width:40,height:40,borderRadius:"8px",background:c.color||T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:700,color:T.bg,flexShrink:0}}>{c.name[0]}</div>
        <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{color:T.text,fontWeight:600,fontSize:"14px"}}>{c.name}</span>{cs.streak>=2&&<span style={{...ss.mono,background:T.green+"15",color:T.green,padding:"1px 5px",borderRadius:"4px",fontSize:"9px",fontWeight:700}}>{cs.streak}w</span>}{isOverdue&&<span style={{background:T.red+"12",color:T.red,fontSize:"9px",fontWeight:700,padding:"1px 5px",borderRadius:"3px"}}>{ds}d ago</span>}</div>
          <div style={{color:T.sub,fontSize:"11px",marginTop:"2px"}}>{ws.length} sessions · Last: {last}{cs.adherence!==null?` · ${cs.adherence}%`:""}{c.gender?` · ${c.gender}`:""}</div>
          <div style={{display:"flex",gap:"3px",marginTop:"3px",flexWrap:"wrap"}}>{Object.entries(tc).map(([t,n])=><span key={t} style={ss.pill(TC[t])}>{t} {n}</span>)}</div>
          {(c.considerations||[]).filter(x=>x.active).length>0&&<div style={{marginTop:"4px",display:"flex",gap:"3px",flexWrap:"wrap"}}>{c.considerations.filter(x=>x.active).map((x,i)=><span key={i} style={{...ss.pill(T.red),fontSize:"9px"}}>{x.text}</span>)}</div>}
        </div><span style={{color:T.dim,fontSize:"18px"}}>›</span></div>})}
    </>})()}
    <button onClick={()=>onNav("addClient")} style={{...ss.btn(false),width:"100%",marginTop:"6px",padding:"10px",textAlign:"center"}}>+ Add Client</button>
  </div></div>;
}

// ── TRAINER ANALYTICS ──────────────────────────────────
function TrainerStats({clients,workouts,onBack}){
  const allWs=useMemo(()=>{
    const ws=[];Object.entries(workouts).forEach(([cid,cws])=>{const cl=clients.find(c=>c.id===cid);cws.forEach(w=>ws.push({...w,clientId:cid,clientName:cl?.name||cid}))});
    return ws.sort((a,b)=>a.date.localeCompare(b.date));
  },[workouts,clients]);

  const stats=useMemo(()=>{
    let totalSets=0,totalReps=0,totalVol=0,totalExInstances=0;
    const exNames=new Set(),exByClient={},muscleHits={},typeCount={},monthMap={},dayCount={SU:0,M:0,T:0,W:0,TH:0,F:0,S:0};
    const dayKeyMap={0:"SU",1:"M",2:"T",3:"W",4:"TH",5:"F",6:"S"};
    let heaviestLift={name:"",weight:0,client:"",date:""},mostVolSession={vol:0,client:"",date:"",label:""},longestBlock=0,curBlock=0,lastWeek="";
    const clientSessions={};

    allWs.forEach(w=>{
      // Per-client counts
      clientSessions[w.clientName]=(clientSessions[w.clientName]||0)+1;
      // Type
      typeCount[w.type]=(typeCount[w.type]||0)+1;
      // Day of week
      const dow=new Date(w.date+"T12:00:00").getDay();
      dayCount[dayKeyMap[dow]]++;
      // Month
      const mo=w.date.slice(0,7);
      monthMap[mo]=(monthMap[mo]||0)+1;
      // Week streak
      const wk=getISOWeek(w.date);
      if(lastWeek&&wk!==lastWeek){const gap=wk-lastWeek;if(gap===1)curBlock++;else curBlock=1}else if(!lastWeek)curBlock=1;
      lastWeek=wk;
      if(curBlock>longestBlock)longestBlock=curBlock;

      let sessionVol=0;
      w.blocks.forEach(b=>b.exercises.forEach(e=>{
        totalExInstances++;
        if(e.name)exNames.add(e.name);
        const s=e.sets||1,r=e.reps||0,wt=e.weight||0;
        totalSets+=s;totalReps+=s*r;
        const v=s*r*wt;totalVol+=v;sessionVol+=v;
        // Heaviest
        if(wt>heaviestLift.weight)heaviestLift={name:e.name,weight:wt,client:w.clientName,date:w.date};
        // Muscles
        (MM[e.name]||[]).forEach(g=>{if(g!=="Grip")muscleHits[g]=(muscleHits[g]||0)+s});
        // Per-client exercises
        if(!exByClient[w.clientName])exByClient[w.clientName]=new Set();
        if(e.name)exByClient[w.clientName].add(e.name);
      }));
      if(sessionVol>mostVolSession.vol)mostVolSession={vol:sessionVol,client:w.clientName,date:w.date,label:w.label||w.type};
    });

    // Most popular exercise
    const exCount={};allWs.forEach(w=>w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name)exCount[e.name]=(exCount[e.name]||0)+1})));
    const topExArr=Object.entries(exCount).sort((a,b)=>b[1]-a[1]);
    const topEx=topExArr[0]||["—",0];

    // Busiest week
    const weekCounts={};allWs.forEach(w=>{const wk=w.date.slice(0,4)+"-W"+String(getISOWeek(w.date)).padStart(2,"0");weekCounts[wk]=(weekCounts[wk]||0)+1});
    const busiestWeek=Object.entries(weekCounts).sort((a,b)=>b[1]-a[1])[0]||["—",0];

    // Busiest month
    const busiestMonth=Object.entries(monthMap).sort((a,b)=>b[1]-a[1])[0]||["—",0];

    // Most popular day
    const popDay=Object.entries(dayCount).sort((a,b)=>b[1]-a[1])[0]||["—",0];

    // First & last session
    const firstDate=allWs.length?allWs[0].date:null;
    const lastDate=allWs.length?allWs[allWs.length-1].date:null;
    const tenure=firstDate?Math.floor((new Date(lastDate+"T12:00:00")-new Date(firstDate+"T12:00:00"))/86400000):0;

    // Client with most sessions
    const topClient=Object.entries(clientSessions).sort((a,b)=>b[1]-a[1])[0]||["—",0];

    // Most diverse client
    const diverseClient=Object.entries(exByClient).sort((a,b)=>b[1].size-a[1].size).map(([n,s])=>[n,s.size])[0]||["—",0];

    // Avg sessions per week
    const weeks=tenure?Math.max(tenure/7,1):1;
    const avgPerWeek=(allWs.length/weeks).toFixed(1);

    // Muscle balance
    const muscleArr=Object.entries(muscleHits).sort((a,b)=>b[1]-a[1]);

    // Fun equivalents
    const schoolBuses=Math.floor(totalVol/24000); // avg school bus ~24,000 lbs
    const elephants=(totalVol/13000).toFixed(1); // avg elephant ~13,000 lbs
    const eiffelStairs=Math.floor(totalReps/1665); // 1,665 steps to top of Eiffel Tower
    const barsLoaded=Math.floor(totalVol/45); // 45lb plates conceptually

    return{
      totalSessions:allWs.length,totalSets,totalReps,totalVol,totalExInstances,
      uniqueEx:exNames.size,heaviestLift,mostVolSession,
      topEx,topClient,diverseClient,
      popDay,busiestWeek,busiestMonth,
      longestBlock,tenure,firstDate,lastDate,avgPerWeek,
      muscleArr,typeCount,clientSessions,
      topExArr:topExArr.slice(0,10),
      schoolBuses,elephants,eiffelStairs,barsLoaded
    };
  },[allWs,clients]);

  const S=stats;
  const fmt=n=>n>=1000000?(n/1000000).toFixed(1)+"M":n>=1000?(n/1000).toFixed(1)+"K":String(n);
  const fmtVol=n=>n>=1000000?(n/1000000).toFixed(2)+"M":n>=1000?(n/1000).toFixed(1)+"K":String(n);
  const dayNames={SU:"Sun",M:"Mon",T:"Tue",W:"Wed",TH:"Thu",F:"Fri",S:"Sat"};
  const moName=mo=>{const[y,m]=mo.split("-");return new Date(Number(y),Number(m)-1).toLocaleDateString("en-US",{month:"short",year:"2-digit"})};

  const Hero=({v,l,sub,c=T.accent,big})=><div style={{background:T.surface,borderRadius:"8px",padding:big?"16px 10px":"10px 8px",textAlign:"center"}}>
    <div style={{...ss.mono,color:c,fontSize:big?"28px":"20px",fontWeight:700,lineHeight:1.1}}>{v}</div>
    <div style={{color:T.sub,fontSize:"10px",fontWeight:600,marginTop:"3px",letterSpacing:".3px"}}>{l}</div>
    {sub&&<div style={{color:T.dim,fontSize:"9px",marginTop:"2px"}}>{sub}</div>}
  </div>;

  const mxMuscle=S.muscleArr.length?S.muscleArr[0][1]:1;

  return <div>
    <div style={ss.header}>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:T.sub,fontSize:"18px",cursor:"pointer",padding:"2px"}}>‹</button>
        <div>
          <h1 style={{margin:0,fontSize:"18px",fontWeight:700,letterSpacing:"-.3px"}}><span style={{color:T.accent}}>FORGE</span> <span style={{fontWeight:400,color:T.sub}}>Trainer Analytics</span></h1>
          <p style={{margin:"2px 0 0",color:T.dim,fontSize:"10px"}}>{S.tenure} days of coaching · {clients.length} clients · {S.firstDate} → {S.lastDate}</p>
        </div>
      </div>
    </div>
    <div style={ss.content}>

      {/* Hero Numbers */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>🏋️ THE BIG NUMBERS</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
        <Hero v={fmt(S.totalSessions)} l="Sessions Coached" c={T.accent} big/>
        <Hero v={fmtVol(S.totalVol)+"#"} l="Total Volume" sub={`${S.elephants} elephants 🐘`} c={T.green} big/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"12px"}}>
        <Hero v={fmt(S.totalReps)} l="Total Reps" sub={S.eiffelStairs>0?`${S.eiffelStairs}× Eiffel Tower 🗼`:""} c={T.blue}/>
        <Hero v={fmt(S.totalSets)} l="Total Sets" c={T.cyan}/>
        <Hero v={S.uniqueEx} l="Unique Exercises" c={T.purple}/>
      </div>

      {/* Records */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>RECORDS</div>
      <div style={ss.card}>
        <div style={{display:"grid",gap:"10px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{color:T.sub,fontSize:"10px",fontWeight:700}}>HEAVIEST SINGLE LIFT</div><div style={{color:T.text,fontSize:"13px",fontWeight:600}}>{S.heaviestLift.name}</div><div style={{color:T.dim,fontSize:"11px"}}>{S.heaviestLift.client} · {S.heaviestLift.date}</div></div>
            <div style={{...ss.mono,color:T.accent,fontSize:"22px",fontWeight:700}}>{S.heaviestLift.weight}#</div>
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{color:T.sub,fontSize:"10px",fontWeight:700}}>HIGHEST VOLUME SESSION</div><div style={{color:T.text,fontSize:"13px",fontWeight:600}}>{S.mostVolSession.label}</div><div style={{color:T.dim,fontSize:"11px"}}>{S.mostVolSession.client} · {S.mostVolSession.date}</div></div>
            <div style={{...ss.mono,color:T.green,fontSize:"18px",fontWeight:700}}>{fmtVol(S.mostVolSession.vol)}#</div>
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{color:T.sub,fontSize:"10px",fontWeight:700}}>LONGEST STREAK</div><div style={{color:T.dim,fontSize:"11px"}}>Consecutive weeks with sessions</div></div>
            <div style={{...ss.mono,color:T.blue,fontSize:"18px",fontWeight:700}}>{S.longestBlock} wks</div>
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{color:T.sub,fontSize:"10px",fontWeight:700}}>BUSIEST WEEK</div><div style={{color:T.dim,fontSize:"11px"}}>{S.busiestWeek[0]}</div></div>
            <div style={{...ss.mono,color:T.purple,fontSize:"18px",fontWeight:700}}>{S.busiestWeek[1]} sessions</div>
          </div>
        </div>
      </div>

      {/* Client Leaderboard */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>CLIENT LEADERBOARD</div>
      <div style={ss.card}>
        {Object.entries(S.clientSessions).sort((a,b)=>b[1]-a[1]).map(([name,cnt],i)=>{const cl=clients.find(c=>c.name===name);const pct=cnt/S.totalSessions*100;
          return <div key={name} style={{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0",borderBottom:i<Object.keys(S.clientSessions).length-1?`1px solid ${T.border}12`:"none"}}>
            <span style={{...ss.mono,color:i===0?T.accent:T.dim,fontSize:"12px",fontWeight:700,width:"18px"}}>{i+1}</span>
            <span style={{width:26,height:26,borderRadius:"6px",background:cl?.color||T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:T.bg,flexShrink:0}}>{name[0]}</span>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:T.text,fontSize:"12px",fontWeight:600}}>{name}</span><span style={{...ss.mono,color:T.sub,fontSize:"11px"}}>{cnt} sessions</span></div>
              <div style={{height:3,borderRadius:2,background:T.border,marginTop:"3px",overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:cl?.color||T.accent,width:`${pct}%`}}/></div>
            </div>
          </div>})}
      </div>

      {/* Schedule Intelligence */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>📅 SCHEDULE INTELLIGENCE</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"8px"}}>
        <Hero v={S.avgPerWeek} l="Avg Sessions/Wk" c={T.blue}/>
        <Hero v={dayNames[S.popDay[0]]||"—"} l="Busiest Day" sub={`${S.popDay[1]} sessions`} c={T.accent}/>
        <Hero v={S.busiestMonth[0]?moName(S.busiestMonth[0]):"—"} l="Busiest Month" sub={`${S.busiestMonth[1]} sessions`} c={T.green}/>
      </div>
      <div style={ss.card}>
        <div style={{color:T.sub,fontSize:"10px",fontWeight:700,letterSpacing:"1px",marginBottom:"12px"}}>SESSIONS BY DAY</div>
        {(()=>{const dayCounts=["M","T","W","TH","F","S","SU"].map(d=>{const v=Object.entries(workouts).reduce((a,[,ws])=>a+ws.filter(w=>{const dow=new Date(w.date+"T12:00:00").getDay();return{0:"SU",1:"M",2:"T",3:"W",4:"TH",5:"F",6:"S"}[dow]===d}).length,0);return{d,v}});const mx=Math.max(...dayCounts.map(x=>x.v),1);
        return <div style={{display:"flex",gap:"4px",alignItems:"flex-end",height:"80px"}}>
          {dayCounts.map(({d,v})=><div key={d} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}>
            <span style={{...ss.mono,color:T.sub,fontSize:"9px"}}>{v}</span>
            <div style={{width:"100%",background:`linear-gradient(180deg,${T.accent},${T.accent}60)`,borderRadius:"3px 3px 0 0",height:`${Math.max(v/mx*55,2)}px`,transition:"height .3s"}}/>
            <span style={{color:T.dim,fontSize:"9px",fontWeight:600}}>{d}</span>
          </div>)}
        </div>})()}
      </div>

      {/* Workout Type Mix */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>🎯 WORKOUT TYPE MIX</div>
      <div style={ss.card}>
        {Object.entries(S.typeCount).sort((a,b)=>b[1]-a[1]).map(([type,cnt])=><div key={type} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
          <span style={{...ss.pill(TC[type]),fontSize:"10px",width:"50px",textAlign:"center"}}>{type}</span>
          <div style={{flex:1,height:8,background:T.surface,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",background:TC[type]||T.accent,borderRadius:4,width:`${cnt/S.totalSessions*100}%`}}/></div>
          <span style={{...ss.mono,color:T.sub,fontSize:"11px",width:"36px",textAlign:"right"}}>{cnt}</span>
        </div>)}
      </div>

      {/* Top Exercises */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>MOST PROGRAMMED EXERCISES</div>
      <div style={ss.card}>
        {S.topExArr.map(([name,cnt],i)=>{const ms=(MM[name]||[]).filter(m=>m!=="Grip");
          return <div key={name} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:i<S.topExArr.length-1?`1px solid ${T.border}12`:"none"}}>
            <span style={{...ss.mono,color:i<3?T.accent:T.dim,fontSize:"11px",fontWeight:700,width:"20px"}}>{i+1}</span>
            <div style={{flex:1}}>
              <div style={{color:T.text,fontSize:"12px",fontWeight:500}}>{name}</div>
              {ms.length>0&&<div style={{display:"flex",gap:"2px",marginTop:"1px"}}>{ms.slice(0,2).map(m=><Pill key={m} g={m}/>)}</div>}
            </div>
            <span style={{...ss.mono,color:T.sub,fontSize:"11px"}}>{cnt}×</span>
          </div>})}
      </div>

      {/* Muscle Coverage */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>🎯 ALL-TIME MUSCLE COVERAGE</div>
      <div style={ss.card}>
        {S.muscleArr.map(([g,v])=><div key={g} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
          <span style={{color:MC[g]||T.sub,fontSize:"11px",fontWeight:600,width:"68px",textAlign:"right",flexShrink:0}}>{g}</span>
          <div style={{flex:1,height:11,background:T.surface,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${v/mxMuscle*100}%`,background:`linear-gradient(90deg,${MC[g]||T.sub}70,${MC[g]||T.sub}30)`,borderRadius:3}}/></div>
          <span style={{...ss.mono,color:T.sub,fontSize:"10px",width:"32px"}}>{fmt(v)}</span>
        </div>)}
      </div>

      {/* Fun Equivalents */}
      <div style={{color:T.accent,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>🎉 FUN FACTS</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"20px"}}>
        <div style={{...ss.card,textAlign:"center",marginBottom:0,padding:"12px 8px"}}><div style={{fontSize:"22px",marginBottom:"4px"}}>🐘</div><div style={{...ss.mono,color:T.accent,fontSize:"16px",fontWeight:700}}>{S.elephants}</div><div style={{color:T.dim,fontSize:"10px"}}>Elephants lifted</div></div>
        <div style={{...ss.card,textAlign:"center",marginBottom:0,padding:"12px 8px"}}><div style={{fontSize:"22px",marginBottom:"4px"}}>🚌</div><div style={{...ss.mono,color:T.green,fontSize:"16px",fontWeight:700}}>{S.schoolBuses}</div><div style={{color:T.dim,fontSize:"10px"}}>School buses moved</div></div>
        <div style={{...ss.card,textAlign:"center",marginBottom:0,padding:"12px 8px"}}><div style={{fontSize:"22px",marginBottom:"4px"}}>🗼</div><div style={{...ss.mono,color:T.blue,fontSize:"16px",fontWeight:700}}>{S.eiffelStairs}×</div><div style={{color:T.dim,fontSize:"10px"}}>Eiffel Tower climbed</div></div>
        <div style={{...ss.card,textAlign:"center",marginBottom:0,padding:"12px 8px"}}><div style={{fontSize:"22px",marginBottom:"4px"}}>🏋️</div><div style={{...ss.mono,color:T.purple,fontSize:"16px",fontWeight:700}}>{fmt(S.totalExInstances)}</div><div style={{color:T.dim,fontSize:"10px"}}>Exercise entries</div></div>
      </div>

    </div>
  </div>;
}

// helper: ISO week number
function getISOWeek(dateStr){const d=new Date(dateStr+"T12:00:00");d.setDate(d.getDate()+3-(d.getDay()+6)%7);const w1=new Date(d.getFullYear(),0,4);return 1+Math.round(((d-w1)/86400000-3+(w1.getDay()+6)%7)/7)}

// ── InBody Check-in Panel ──
function CheckInPanel({client,onSaveCl}){
  const checkins=client.checkins||[];
  const[show,setShow]=useState(false);
  const[form,setForm]=useState({date:new Date().toISOString().slice(0,10),weight:"",bodyFat:"",muscleMass:"",bmi:"",visceralFat:"",notes:""});
  const inp={background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"7px 10px",borderRadius:"6px",fontSize:"13px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"};
  const addCheckin=()=>{if(!form.weight&&!form.bodyFat&&!form.muscleMass)return;const ci=[...checkins,{...form,weight:form.weight?Number(form.weight):null,bodyFat:form.bodyFat?Number(form.bodyFat):null,muscleMass:form.muscleMass?Number(form.muscleMass):null,bmi:form.bmi?Number(form.bmi):null,visceralFat:form.visceralFat?Number(form.visceralFat):null}];ci.sort((a,b)=>a.date.localeCompare(b.date));onSaveCl({...client,checkins:ci});setForm({date:new Date().toISOString().slice(0,10),weight:"",bodyFat:"",muscleMass:"",bmi:"",visceralFat:"",notes:""});setShow(false)};
  const delCheckin=(i)=>{onSaveCl({...client,checkins:checkins.filter((_,j)=>j!==i)})};
  const latest=checkins.length?checkins[checkins.length-1]:null;

  return <div style={ss.card}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
      <span style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>BODY COMPOSITION CHECK-INS</span>
      <button onClick={()=>setShow(!show)} style={{...ss.btn(show),fontSize:"11px",padding:"3px 10px"}}>{show?"Cancel":"+ Check-in"}</button>
    </div>
    {latest&&!show&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))",gap:"6px",marginBottom:"8px"}}>
      {latest.weight&&<div style={{background:T.surface,borderRadius:"6px",padding:"8px",textAlign:"center"}}><div style={{...ss.mono,color:T.blue,fontSize:"16px",fontWeight:700}}>{latest.weight}</div><div style={{color:T.dim,fontSize:"9px"}}>WEIGHT (lbs)</div></div>}
      {latest.bodyFat&&<div style={{background:T.surface,borderRadius:"6px",padding:"8px",textAlign:"center"}}><div style={{...ss.mono,color:T.pink,fontSize:"16px",fontWeight:700}}>{latest.bodyFat}%</div><div style={{color:T.dim,fontSize:"9px"}}>BODY FAT</div></div>}
      {latest.muscleMass&&<div style={{background:T.surface,borderRadius:"6px",padding:"8px",textAlign:"center"}}><div style={{...ss.mono,color:T.green,fontSize:"16px",fontWeight:700}}>{latest.muscleMass}</div><div style={{color:T.dim,fontSize:"9px"}}>MUSCLE (lbs)</div></div>}
      {latest.bmi&&<div style={{background:T.surface,borderRadius:"6px",padding:"8px",textAlign:"center"}}><div style={{...ss.mono,color:T.purple,fontSize:"16px",fontWeight:700}}>{latest.bmi}</div><div style={{color:T.dim,fontSize:"9px"}}>BMI</div></div>}
    </div>}
    {show&&<div style={{marginBottom:"8px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"6px"}}>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Date</label><input type="date" style={inp} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Weight (lbs)</label><input style={inp} value={form.weight} onChange={e=>setForm(p=>({...p,weight:e.target.value}))} placeholder="185"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"6px"}}>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Body Fat %</label><input style={inp} value={form.bodyFat} onChange={e=>setForm(p=>({...p,bodyFat:e.target.value}))} placeholder="18.5"/></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Muscle Mass</label><input style={inp} value={form.muscleMass} onChange={e=>setForm(p=>({...p,muscleMass:e.target.value}))} placeholder="155"/></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>BMI</label><input style={inp} value={form.bmi} onChange={e=>setForm(p=>({...p,bmi:e.target.value}))} placeholder="24.5"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"6px"}}>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Visceral Fat</label><input style={inp} value={form.visceralFat} onChange={e=>setForm(p=>({...p,visceralFat:e.target.value}))} placeholder="8"/></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Notes</label><input style={inp} value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Post-holiday"/></div>
      </div>
      <button onClick={addCheckin} style={{...ss.btn(true),width:"100%",padding:"8px"}}>Save Check-in</button>
    </div>}
    {checkins.length>0&&<div>
      <div style={{display:"grid",gridTemplateColumns:"70px 50px 42px 50px 38px 1fr 24px",gap:"4px",padding:"4px 0",borderBottom:`1px solid ${T.border}`,marginBottom:"2px"}}>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>DATE</span>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>WEIGHT</span>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>BF%</span>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>MUSCLE</span>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>BMI</span>
        <span style={{color:T.dim,fontSize:"9px",fontWeight:700}}>NOTES</span>
        <span></span>
      </div>
      {[...checkins].reverse().map((ci,i)=>{const idx=checkins.length-1-i;return <div key={idx} style={{display:"grid",gridTemplateColumns:"70px 50px 42px 50px 38px 1fr 24px",gap:"4px",padding:"3px 0",borderBottom:`1px solid ${T.border}10`,alignItems:"center"}}>
        <span style={{...ss.mono,color:T.sub,fontSize:"11px"}}>{new Date(ci.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
        <span style={{...ss.mono,color:T.blue,fontSize:"11px",fontWeight:600}}>{ci.weight||"–"}</span>
        <span style={{...ss.mono,color:T.pink,fontSize:"11px",fontWeight:600}}>{ci.bodyFat?ci.bodyFat+"%":"–"}</span>
        <span style={{...ss.mono,color:T.green,fontSize:"11px",fontWeight:600}}>{ci.muscleMass||"–"}</span>
        <span style={{...ss.mono,color:T.purple,fontSize:"11px",fontWeight:600}}>{ci.bmi||"–"}</span>
        <span style={{color:T.dim,fontSize:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ci.notes||""}</span>
        <button onClick={()=>delCheckin(idx)} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"12px",padding:"0"}}>×</button>
      </div>})}
    </div>}
    <p style={{color:T.dim,fontSize:"10px",margin:"6px 0 0"}}>Track InBody 270S scan data or manual measurements. <a href="https://inbodyusa.com/products/inbody-270s/" target="_blank" rel="noreferrer" style={{color:T.cyan,textDecoration:"none"}}>InBody info ↗</a></p>
  </div>;
}

// ── Workout Builder ──
function WorkoutBuilder({type,types,onTypeChange,allWs,onSave,onCancel}){
  const[label,setLabel]=useState(`${type} Day`);
  const[warmup,setWarmup]=useState(WU[type]||"General warmup");
  const[blocks,setBlocks]=useState([{name:"Main – 4 rds",exercises:[{name:"",sets:4,reps:10,weight:null,notes:""}]}]);
  const[search,setSearch]=useState("");
  const[activeSlot,setActiveSlot]=useState(null);

  const allExNames=useMemo(()=>{
    const s=new Set(Object.keys(MM));
    allWs.forEach(w=>w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name)s.add(e.name)})));
    return [...s].sort();
  },[allWs]);

  const lastUsed=useMemo(()=>{
    const m={};allWs.forEach(w=>{const seen={};w.blocks.forEach(b=>b.exercises.forEach(e=>{if(!e.name)return;if(!seen[e.name])seen[e.name]={totalS:0,maxW:0,reps:0};seen[e.name].totalS+=(e.sets||1);if(e.weight&&e.weight>seen[e.name].maxW)seen[e.name].maxW=e.weight;seen[e.name].reps=e.reps}));Object.entries(seen).forEach(([name,s])=>{m[name]={weight:s.maxW||null,reps:s.reps,sets:s.totalS}})});return m;
  },[allWs]);

  const filtered=search.length>0?allExNames.filter(n=>n.toLowerCase().includes(search.toLowerCase())).slice(0,12):[];
  const addBlock=()=>setBlocks(p=>[...p,{name:"Superset – 4 rds",exercises:[{name:"",sets:4,reps:10,weight:null,notes:""}]}]);
  const delBlock=bi=>setBlocks(p=>p.filter((_,i)=>i!==bi));
  const updBlock=(bi,name)=>setBlocks(p=>p.map((b,i)=>i===bi?{...b,name}:b));
  const addEx=bi=>setBlocks(p=>p.map((b,i)=>i===bi?{...b,exercises:[...b.exercises,{name:"",sets:4,reps:10,weight:null,notes:""}]}:b));
  const delEx=(bi,ei)=>setBlocks(p=>p.map((b,i)=>i===bi?{...b,exercises:b.exercises.filter((_,j)=>j!==ei)}:b));
  const updEx=(bi,ei,f,v)=>setBlocks(p=>p.map((b,i)=>i===bi?{...b,exercises:b.exercises.map((e,j)=>j===ei?{...e,[f]:f==="weight"||f==="sets"||f==="reps"?(v===""?null:Number(v)):v}:e)}:b));
  const pickEx=(bi,ei,name)=>{const lu=lastUsed[name];updEx(bi,ei,"name",name);if(lu){if(lu.weight)updEx(bi,ei,"weight",lu.weight);if(lu.reps)updEx(bi,ei,"reps",lu.reps);if(lu.sets)updEx(bi,ei,"sets",lu.sets)}setActiveSlot(null);setSearch("")};
  const inp={background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"};
  const save=()=>{const w={id:`build-${type}-${Date.now()}`,date:new Date().toISOString().slice(0,10),type,label,warmup,status:"proposed",reasoning:"Manually built by trainer",
    blocks:blocks.filter(b=>b.exercises.some(e=>e.name)).map(b=>({name:b.name,exercises:b.exercises.filter(e=>e.name).map(e=>({...e,done:false}))}))};if(w.blocks.length>0)onSave(w)};

  return <div style={{...ss.card,border:`1px solid ${T.cyan}40`,marginBottom:"12px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
      <span style={{color:T.cyan,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>WORKOUT BUILDER</span>
      <button onClick={onCancel} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"14px"}}>×</button>
    </div>
    <div style={{display:"flex",gap:"5px",marginBottom:"8px",flexWrap:"wrap"}}>
      {types.map(t=><button key={t} onClick={()=>{onTypeChange(t);setLabel(`${t} Day`);setWarmup(WU[t]||"General warmup")}} style={{background:type===t?(TC[t]||T.accent)+"20":"transparent",border:`1px solid ${type===t?(TC[t]||T.accent)+"50":T.border}`,color:type===t?(TC[t]||T.accent):T.dim,padding:"3px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t}</button>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"10px"}}>
      <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Label</label><input style={inp} value={label} onChange={e=>setLabel(e.target.value)}/></div>
      <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Warmup</label><input style={inp} value={warmup} onChange={e=>setWarmup(e.target.value)}/></div>
    </div>
    {blocks.map((bl,bi)=><div key={bi} style={{border:`1px solid ${T.border}`,borderRadius:"6px",padding:"8px",marginBottom:"8px",background:T.surface}}>
      <div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"6px"}}>
        <input style={{...inp,flex:1,fontWeight:600,fontSize:"11px",color:T.accent}} value={bl.name} onChange={e=>updBlock(bi,e.target.value)} placeholder="Block name – 4 rds"/>
        <button onClick={()=>delBlock(bi)} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"14px",padding:"0"}}>×</button>
      </div>
      {bl.exercises.map((ex,ei)=>{const isActive=activeSlot&&activeSlot.bi===bi&&activeSlot.ei===ei;
        return <div key={ei} style={{marginBottom:"6px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 42px 42px 50px 24px",gap:"4px",alignItems:"center"}}>
            <div style={{position:"relative"}}>
              <input style={{...inp,fontSize:"11px",borderColor:isActive?T.cyan:T.border}} value={isActive?search:ex.name} placeholder="Search exercise..."
                onFocus={()=>{setActiveSlot({bi,ei});setSearch(ex.name||"")}}
                onChange={e=>{setSearch(e.target.value);setActiveSlot({bi,ei})}}
                onBlur={()=>setTimeout(()=>setActiveSlot(null),200)}/>
              {isActive&&filtered.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:T.card,border:`1px solid ${T.border}`,borderRadius:"0 0 6px 6px",maxHeight:"180px",overflowY:"auto",zIndex:99}}>
                {filtered.map(n=><div key={n} onMouseDown={e=>e.preventDefault()} onClick={()=>pickEx(bi,ei,n)} style={{padding:"6px 8px",cursor:"pointer",fontSize:"11px",color:T.text,borderBottom:`1px solid ${T.border}18`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>{n}</span>
                  <span style={{color:T.dim,fontSize:"10px"}}>{(MM[n]||[]).join(", ")}{lastUsed[n]&&lastUsed[n].weight?` · ${lastUsed[n].weight}#`:""}</span>
                </div>)}
              </div>}
            </div>
            <input style={{...inp,fontSize:"11px",textAlign:"center"}} value={ex.sets==null?"":ex.sets} onChange={e=>updEx(bi,ei,"sets",e.target.value)} placeholder="S"/>
            <input style={{...inp,fontSize:"11px",textAlign:"center"}} value={ex.reps==null?"":ex.reps} onChange={e=>updEx(bi,ei,"reps",e.target.value)} placeholder="R"/>
            <input style={{...inp,fontSize:"11px",textAlign:"center"}} value={ex.weight==null?"":ex.weight} onChange={e=>updEx(bi,ei,"weight",e.target.value)} placeholder="Wt"/>
            <button onClick={()=>delEx(bi,ei)} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"12px",padding:"0"}}>×</button>
          </div>
          {ex.name&&<input style={{...inp,fontSize:"11px",marginTop:"3px",color:T.dim}} value={ex.notes||""} onChange={e=>updEx(bi,ei,"notes",e.target.value)} placeholder="Notes (tempo, each side, DnB...)"/>}
        </div>})}
      <button onClick={()=>addEx(bi)} style={{background:"none",border:`1px dashed ${T.border}`,color:T.dim,padding:"4px",borderRadius:"4px",width:"100%",fontSize:"11px",cursor:"pointer",fontFamily:"inherit"}}>+ Exercise</button>
    </div>)}
    <button onClick={addBlock} style={{background:"none",border:`1px dashed ${T.border}`,color:T.dim,padding:"8px",borderRadius:"6px",width:"100%",fontSize:"11px",cursor:"pointer",fontFamily:"inherit",marginBottom:"10px"}}>+ Add Block</button>
    <button onClick={save} style={{...ss.btn(true),width:"100%",padding:"10px"}}>💾 Save as Proposed Workout</button>
  </div>;
}

function ClientView({client,ws,proposals,onSaveProposals,onClearProposals,onNav,onSaveW,onDeleteW,onSaveCl,initTab}){
  const[tab,setTab]=useState(initTab||"overview");
  useEffect(()=>{if(initTab)setTab(initTab)},[initTab,client.id]);
  const[filt,setFilt]=useState("all");
  const[exp,setExp]=useState({});
  const setProposals=(updater)=>{const next=typeof updater==="function"?updater(proposals):updater;onSaveProposals(next)};
  const[genLoading,setGenLoading]=useState({});
  const[pinned,setPinned]=useState({});  // {[type]: {[bi-ei]: true}}
  const[buildType,setBuildType]=useState(null);  // workout builder mode
  const[readiness,setReadiness]=useState({sleep:null,soreness:null,energy:null,note:""});
  const[liveW,setLiveW]=useState(null);
  const[liveStart,setLiveStart]=useState(null);
  const[elapsed,setElapsed]=useState("");
  const[editBio,setEditBio]=useState(false);
  const[editingWId,setEditingWId]=useState(null);
  const[editW,setEditW]=useState(null);
  const[bio,setBio]=useState({fullName:client.fullName||"",email:client.email||"",phone:client.phone||"",scheduleDays:client.scheduleDays||[],scheduleNotes:client.scheduleNotes||"",focusAreas:client.focusAreas||"",goals:client.goals||"",dob:client.dob||"",gender:client.gender||"",startingWeight:client.startingWeight||"",workoutTypes:client.workoutTypes||[]});
  const[newCon,setNewCon]=useState("");
  const[selEx,setSelEx]=useState(null);
  const[newSub,setNewSub]=useState({avoid:"",use:""});
  useEffect(()=>{if(!liveStart){setElapsed("");return}const tick=()=>{const s=Math.floor((Date.now()-liveStart)/1000);const m=Math.floor(s/60);const h=Math.floor(m/60);setElapsed(h>0?`${h}h ${m%60}m`:`${m}m ${s%60}s`)};tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[liveStart]);
  const subs=client.substitutions||[];
  const addSub=()=>{if(!newSub.avoid.trim()||!newSub.use.trim())return;onSaveCl({...client,substitutions:[...subs,{avoid:newSub.avoid.trim(),use:newSub.use.trim()}]});setNewSub({avoid:"",use:""})};
  const delSub=i=>onSaveCl({...client,substitutions:subs.filter((_,j)=>j!==i)});

  const sorted=useMemo(()=>[...ws].sort((a,b)=>a.date.localeCompare(b.date)),[ws]);
  const types=useMemo(()=>{const detected=getTypes(sorted);const configured=client.workoutTypes||[];const merged=[...new Set([...detected,...configured])];if(!merged.length)merged.push("upper","lower","glute");return merged},[sorted,client.workoutTypes]);
  const quads=sorted.filter(w=>w.type==="quad");
  const glutes=sorted.filter(w=>w.type==="glute");
  const lowers=sorted.filter(w=>w.type==="lower");
  const tl=useMemo(()=>topLifts(sorted,3),[sorted]);
  const cs=useMemo(()=>clientStats(sorted,client.scheduleDays),[sorted,client.scheduleDays]);
  const af=exFreq(sorted);
  const topEx=Object.entries(af).filter(([n])=>(MM[n]||[]).length>0).sort((a,b)=>b[1].count-a[1].count).slice(0,12);
  const considerations=client.considerations||[];
  const allExNames=useMemo(()=>{const s=new Set(Object.keys(MM));sorted.forEach(w=>w.blocks.forEach(b=>b.exercises.forEach(e=>{if(e.name)s.add(e.name)})));return[...s].sort()},[sorted]);
  const filtHist=filt==="all"?sorted:sorted.filter(w=>w.type===filt);
  const tog=id=>setExp(p=>({...p,[id]:!p[id]}));

  const generateForType = async (type, keepPins) => {
    setGenLoading(p => ({...p, [type]: true}));
    let pinnedEx = null;
    if (keepPins) {
      const p = proposals.find(x => x.type === type);
      const tp = pinned[type] || {};
      if (p && Object.keys(tp).length > 0) {
        pinnedEx = [];
        p.blocks.forEach((b, bi) => b.exercises.forEach((ex, ei) => {
          if (tp[`${bi}-${ei}`]) pinnedEx.push({block:b.name, name:ex.name, sets:ex.sets, reps:ex.reps, weight:ex.weight, notes:ex.notes});
        }));
      }
    } else {
      setPinned(p => ({...p, [type]: {}}));
    }
    const result = await aiGenProposal(sorted, type, client, pinnedEx, readiness);
    setProposals(p => {
      const filtered = p.filter(x => x.type !== type);
      return [...filtered, result];
    });
    setGenLoading(p => ({...p, [type]: false}));
  };

  const generateAll = async () => {
    setProposals([]);
    for (const t of types) {
      await generateForType(t);
    }
  };

  const handleAction = (action, w) => {
    if (action==="start"){const nw={...JSON.parse(JSON.stringify(w)),status:"in-progress",id:`live-${Date.now()}`};nw.blocks.forEach(b=>b.exercises.forEach(e=>{e.done=false}));const rd=readiness;if(rd&&(rd.sleep||rd.soreness||rd.energy||rd.note))nw.readiness=rd;setLiveW(nw);setLiveStart(Date.now());setTab("live");setProposals(prev=>prev.filter(x=>x.type!==w.type))}
    if (action==="complete"){const saved={...w,status:"completed",date:new Date().toISOString().slice(0,10)};saved.blocks=saved.blocks.filter(b=>b.exercises.length>0);onSaveW(client.id,saved);setLiveW(null);setLiveStart(null);setReadiness({sleep:null,soreness:null,energy:null,note:""});setTab("history")}
    if (action==="cancel"){setLiveW(null);setLiveStart(null);setTab("next")}
  };

  const saveBio=()=>{onSaveCl({...client,...bio});setEditBio(false)};
  const addCon=()=>{if(!newCon.trim())return;onSaveCl({...client,considerations:[...considerations,{text:newCon.trim(),date:new Date().toISOString().slice(0,10),active:true}]});setNewCon("")};
  const toggleCon=(i)=>{const nc=[...considerations];nc[i]={...nc[i],active:!nc[i].active};onSaveCl({...client,considerations:nc})};
  const delCon=(i)=>onSaveCl({...client,considerations:considerations.filter((_,j)=>j!==i)});
  const inp={background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"8px 10px",borderRadius:"6px",fontSize:"13px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"};
  const age=client.dob?Math.floor((Date.now()-new Date(client.dob+"T12:00:00").getTime())/31557600000):null;

  if(liveW&&tab==="live")return <div>
    <div style={{...ss.header,background:T.bg}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{background:T.green,color:T.bg,padding:"2px 7px",borderRadius:"4px",fontSize:"10px",fontWeight:800,letterSpacing:"1px"}}>● LIVE</span><h2 style={{margin:0,fontSize:"16px"}}>{liveW.label}</h2><span style={{color:T.sub,fontSize:"11px",marginLeft:"auto"}}>{client.name}</span>{elapsed&&<span style={{...ss.mono,background:T.green+"15",color:T.green,padding:"2px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:600}}>⏱ {elapsed}</span>}</div>
    </div>
    <div style={ss.content}><WCard w={liveW} open={true} toggle={()=>{}} live onChange={setLiveW} onAction={handleAction} onExClick={setSelEx} allExNames={allExNames}/></div>
  </div>;

  return <div>
    <div style={ss.header}><div style={{display:"flex",alignItems:"center",gap:"8px"}}>
      <button onClick={()=>onNav("dashboard")} style={{background:"none",border:"none",color:T.sub,fontSize:"18px",cursor:"pointer",padding:"2px"}}>‹</button>
      <div style={{width:32,height:32,borderRadius:"6px",background:client.color||T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:700,color:T.bg}}>{client.name[0]}</div>
      <div><h2 style={{margin:0,fontSize:"16px",fontWeight:700}}>{client.fullName||client.name}</h2><div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"3px",flexWrap:"wrap"}}>{(client.scheduleDays||[]).length>0&&<span style={{display:"inline-flex",gap:"2px"}}>{["M","T","W","TH","F","S","SU"].filter(d=>(client.scheduleDays||[]).includes(d)).map(d=><span key={d} style={{padding:"1px 5px",borderRadius:"3px",fontSize:"10px",fontWeight:700,background:T.accent+"18",color:T.accent,border:`1px solid ${T.accent}40`}}>{d}</span>)}</span>}<span style={{color:T.sub,fontSize:"11px"}}>{(client.scheduleDays||[]).length===0&&client.schedule?client.schedule+" · ":""}{sorted.length} sessions{age?` · Age ${age}`:""}{client.gender?` · ${client.gender}`:""}</span></div></div>
    </div></div>

    <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,padding:"0 10px",overflowX:"auto"}}>
      {[{id:"overview",l:"Bio"},{id:"next",l:"Next Workouts"},{id:"history",l:"History"},{id:"analytics",l:"Analytics"},{id:"program",l:"Program"}].map(t=>
        <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${T.accent}`:"2px solid transparent",color:tab===t.id?T.accent:T.sub,padding:"9px 12px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{t.l}</button>
      )}
    </div>
    <div style={ss.content}>

      {tab==="overview"&&<>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${2+Math.min(tl.length,2)},1fr)`,gap:"6px",marginBottom:"12px"}}>
          <Stat v={sorted.length} l="Sessions" c={T.accent}/>{tl.slice(0,2).map(l=><Stat key={l.name} v={`${l.max}#`} l={l.short} c={l.color}/>)}<Stat v={sorted.filter(w=>["quad","lower","glute"].includes(w.type)).length} l="Leg+Glute" c={T.glutes}/>
        </div>
        {sorted.length===0&&<div style={{background:T.accent+"05",border:`1px solid ${T.accent}25`,borderRadius:"8px",padding:"16px",marginBottom:"10px",textAlign:"center"}}><div style={{color:T.text,fontWeight:600,fontSize:"13px",marginBottom:"4px"}}>Ready to start training!</div><div style={{color:T.dim,fontSize:"11px",marginBottom:"10px"}}>Fill in the profile below, then generate AI workouts.</div><button onClick={()=>setTab("next")} style={{...ss.btn(true),fontSize:"11px"}}>→ Next Workouts</button></div>}
        {sorted.length>0&&<div style={{...ss.card,padding:"12px 14px",marginBottom:"10px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}><span style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>CONSISTENCY</span>{cs.streak>=2&&<span style={{...ss.mono,background:T.green+"15",color:T.green,padding:"2px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:700}}>{cs.streak}-week streak</span>}</div>
          <div style={{display:"grid",gridTemplateColumns:(client.scheduleDays||[]).length>0?"1fr 1fr 1fr":"1fr 1fr",gap:"8px"}}>
            <div style={{background:T.surface,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{...ss.mono,color:T.accent,fontSize:"20px",fontWeight:700}}>{cs.thisWeekCount}{cs.thisWeekTarget>0?<span style={{color:T.dim,fontSize:"13px",fontWeight:400}}>/{cs.thisWeekTarget}</span>:""}</div><div style={{color:T.dim,fontSize:"10px",marginTop:"2px"}}>This Week</div>{cs.thisWeekTarget>0&&<div style={{height:4,borderRadius:2,background:T.border,marginTop:"6px",overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:cs.thisWeekCount>=cs.thisWeekTarget?T.green:T.accent,width:`${Math.min(cs.thisWeekCount/cs.thisWeekTarget*100,100)}%`,transition:"width .3s"}}/></div>}</div>
            {(client.scheduleDays||[]).length>0&&<div style={{background:T.surface,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{...ss.mono,color:cs.adherence>=75?T.green:cs.adherence>=50?T.accent:T.red,fontSize:"20px",fontWeight:700}}>{cs.adherence!==null?`${cs.adherence}%`:"—"}</div><div style={{color:T.dim,fontSize:"10px",marginTop:"2px"}}>4-Wk Adherence</div>{cs.adherence!==null&&<div style={{height:4,borderRadius:2,background:T.border,marginTop:"6px",overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:cs.adherence>=75?T.green:cs.adherence>=50?T.accent:T.red,width:`${cs.adherence}%`,transition:"width .3s"}}/></div>}</div>}
            <div style={{background:T.surface,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{...ss.mono,color:cs.streak>=4?T.green:cs.streak>=2?T.accent:T.dim,fontSize:"20px",fontWeight:700}}>{cs.streak}<span style={{fontSize:"11px",fontWeight:400}}>w</span></div><div style={{color:T.dim,fontSize:"10px",marginTop:"2px"}}>Streak</div></div>
          </div>
        </div>}
        {(()=>{const phase=getCurrentPhase(client.program);if(!phase)return null;
          const pct=phase.completed?100:phase.upcoming?0:Math.round((phase.weekTotal/phase.totalWeeks)*100);
          const ic={low:T.green,moderate:T.accent,high:T.red,max:"#DC2626"}[phase.block?.intensity]||T.accent;
          if(phase.completed)return <div style={{...ss.card,border:`1px solid ${T.green}30`,background:T.green+"06",padding:"12px 14px",marginBottom:"10px"}}>
            <div style={{color:T.green,fontSize:"11px",fontWeight:700}}>PROGRAM COMPLETE</div>
            <div style={{color:T.sub,fontSize:"11px",marginTop:"2px"}}>{phase.totalWeeks}-week program finished. <button onClick={()=>setTab("program")} style={{background:"none",border:"none",color:T.accent,fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",padding:0}}>Set up next block →</button></div>
          </div>;
          if(phase.upcoming)return <div style={{...ss.card,border:`1px solid ${T.blue}30`,background:T.blue+"06",padding:"12px 14px",marginBottom:"10px"}}>
            <div style={{color:T.blue,fontSize:"11px",fontWeight:700}}>PROGRAM STARTS IN {phase.daysUntilStart} DAYS</div>
            <div style={{color:T.sub,fontSize:"11px",marginTop:"2px"}}>First phase: {phase.block.name} · <button onClick={()=>setTab("program")} style={{background:"none",border:"none",color:T.accent,fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",padding:0}}>View program →</button></div>
          </div>;
          return <div style={{...ss.card,border:`1px solid ${ic}30`,background:ic+"06",padding:"12px 14px",marginBottom:"10px",cursor:"pointer"}} onClick={()=>setTab("program")}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><span style={{color:ic,fontSize:"11px",fontWeight:700,letterSpacing:".5px"}}>{phase.block.name.toUpperCase()}</span><span style={{color:T.sub,fontSize:"11px",marginLeft:"8px"}}>Week {phase.weekInBlock}/{phase.block.weeks}</span></div>
              <span style={{...ss.mono,color:ic,fontSize:"11px",fontWeight:700}}>Wk {phase.weekTotal}/{phase.totalWeeks}</span>
            </div>
            {phase.block.repRange&&<div style={{color:T.sub,fontSize:"11px",marginTop:"4px"}}>Rep range: {phase.block.repRange} · Intensity: {phase.block.intensity||"moderate"}</div>}
            <div style={{height:4,borderRadius:2,background:T.border,marginTop:"6px",overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${ic},${ic}80)`,width:`${pct}%`,transition:"width .3s"}}/></div>
          </div>;
        })()}
        <div style={ss.card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <span style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>CLIENT PROFILE</span>
            <button onClick={()=>{if(editBio)saveBio();else{setBio({fullName:client.fullName||"",email:client.email||"",phone:client.phone||"",scheduleDays:client.scheduleDays||[],scheduleNotes:client.scheduleNotes||"",focusAreas:client.focusAreas||"",goals:client.goals||"",dob:client.dob||"",gender:client.gender||"",startingWeight:client.startingWeight||"",workoutTypes:client.workoutTypes||[...new Set(sorted.map(w=>w.type))]});setEditBio(true)}}} style={{...ss.btn(editBio),fontSize:"11px",padding:"3px 10px"}}>{editBio?"Save":"Edit"}</button>
          </div>
          {editBio?<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"8px"}}>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Full Name</label><input style={{...inp,width:"100%"}} value={bio.fullName} onChange={e=>setBio(p=>({...p,fullName:e.target.value}))} placeholder="First Last"/></div>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Email</label><input type="email" style={{...inp,width:"100%"}} value={bio.email} onChange={e=>setBio(p=>({...p,email:e.target.value}))} placeholder="email@example.com"/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"8px"}}>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Phone</label><input type="tel" style={{...inp,width:"100%"}} value={bio.phone} onChange={e=>setBio(p=>({...p,phone:e.target.value}))} placeholder="(555) 123-4567"/></div>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Date of Birth</label><input type="date" style={inp} value={bio.dob} onChange={e=>setBio(p=>({...p,dob:e.target.value}))}/></div>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Gender</label><select style={{...inp,appearance:"auto"}} value={bio.gender} onChange={e=>setBio(p=>({...p,gender:e.target.value}))}><option value="">—</option><option value="M">Male</option><option value="F">Female</option><option value="Other">Other</option></select></div>
            </div>
            <div style={{marginBottom:"8px"}}>
              <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Start Weight (lbs)</label><input style={{...inp,width:"80px"}} value={bio.startingWeight} onChange={e=>setBio(p=>({...p,startingWeight:e.target.value}))} placeholder="185"/></div>
            </div>
            <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"4px"}}>Scheduled Days</label>
            <div style={{display:"flex",gap:"4px",marginBottom:"4px"}}>{[["M","Mon"],["T","Tue"],["W","Wed"],["TH","Thu"],["F","Fri"],["S","Sat"],["SU","Sun"]].map(([k,l])=><button key={k} onClick={()=>setBio(p=>({...p,scheduleDays:p.scheduleDays.includes(k)?p.scheduleDays.filter(d=>d!==k):[...p.scheduleDays,k]}))} style={{width:36,height:32,borderRadius:"6px",border:`1.5px solid ${bio.scheduleDays.includes(k)?T.accent:T.border}`,background:bio.scheduleDays.includes(k)?T.accent+"15":T.card,color:bio.scheduleDays.includes(k)?T.accent:T.dim,fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>{l}</button>)}</div>
            <input style={{...inp,marginBottom:"8px",fontSize:"12px"}} value={bio.scheduleNotes} onChange={e=>setBio(p=>({...p,scheduleNotes:e.target.value}))} placeholder="e.g. Mornings, 5:30 PM, alternating weeks..."/>
            <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Focus Areas / Split</label>
            <textarea style={{...inp,height:"55px",resize:"vertical",marginBottom:"6px"}} value={bio.focusAreas} onChange={e=>setBio(p=>({...p,focusAreas:e.target.value}))}/>
            <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Goals</label>
            <textarea style={{...inp,height:"45px",resize:"vertical",marginBottom:"8px"}} value={bio.goals} onChange={e=>setBio(p=>({...p,goals:e.target.value}))}/>
            <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"4px"}}>Workout Types</label>
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>{["quad","lower","glute","upper","push","pull","full"].map(t=><button key={t} onClick={()=>setBio(p=>({...p,workoutTypes:p.workoutTypes.includes(t)?p.workoutTypes.filter(x=>x!==t):[...p.workoutTypes,t]}))} style={{background:bio.workoutTypes.includes(t)?(TC[t]||T.accent)+"20":"transparent",border:`1px solid ${bio.workoutTypes.includes(t)?(TC[t]||T.accent)+"50":T.border}`,color:bio.workoutTypes.includes(t)?(TC[t]||T.accent):T.dim,padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t}</button>)}</div>
          </>:<>
            <div style={{marginBottom:"8px"}}>
              {client.fullName&&<div style={{fontSize:"14px",fontWeight:600,color:T.text,marginBottom:"2px"}}>{client.fullName}</div>}
              <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
                {client.email&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>✉ </span><span style={{color:T.sub,fontSize:"12px"}}>{client.email}</span></div>}
                {client.phone&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>☎ </span><span style={{color:T.sub,fontSize:"12px"}}>{client.phone}</span></div>}
              </div>
            </div>
            <div style={{display:"flex",gap:"12px",marginBottom:"8px",flexWrap:"wrap"}}>
              {client.dob&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>DOB: </span><span style={{color:T.text,fontSize:"12px"}}>{new Date(client.dob+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}{age?` (${age})`:""}</span></div>}
              {client.gender&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Gender: </span><span style={{color:T.text,fontSize:"12px"}}>{client.gender}</span></div>}
              {client.startingWeight&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Start Wt: </span><span style={{color:T.text,fontSize:"12px"}}>{client.startingWeight} lbs</span></div>}
            </div>
            {(client.scheduleDays||[]).length>0&&<div style={{marginBottom:"8px"}}><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Training Days: </span><span style={{display:"inline-flex",gap:"3px",marginLeft:"4px"}}>{["M","T","W","TH","F","S","SU"].filter(d=>(client.scheduleDays||[]).includes(d)).map(d=><span key={d} style={{padding:"2px 6px",borderRadius:"4px",fontSize:"10px",fontWeight:700,background:T.accent+"15",color:T.accent,border:`1px solid ${T.accent}40`}}>{d}</span>)}</span>{client.scheduleNotes&&<span style={{color:T.sub,fontSize:"11px",marginLeft:"8px"}}>{client.scheduleNotes}</span>}</div>}
            {client.focusAreas&&<div style={{marginBottom:"6px"}}><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Focus: </span><span style={{color:T.text,fontSize:"12px"}}>{client.focusAreas}</span></div>}
            {client.goals&&<div style={{marginBottom:"6px"}}><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Goals: </span><span style={{color:T.text,fontSize:"12px"}}>{client.goals}</span></div>}
            {types.length>0&&<div><span style={{color:T.dim,fontSize:"10px",textTransform:"uppercase",letterSpacing:".5px"}}>Workout Types: </span><span style={{display:"inline-flex",gap:"4px",flexWrap:"wrap",marginTop:"3px"}}>{types.map(t=><span key={t} style={ss.pill(TC[t])}>{t}</span>)}</span></div>}
          </>}
        </div>
        <div style={ss.card}>
          <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>CONSIDERATIONS & INJURIES</div>
          {considerations.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 0",borderBottom:`1px solid ${T.border}18`}}>
            <button onClick={()=>toggleCon(i)} style={{width:18,height:18,borderRadius:"4px",border:`2px solid ${c.active?T.red:T.dim}`,background:c.active?T.red+"20":"transparent",cursor:"pointer",fontSize:"11px",color:T.red,display:"flex",alignItems:"center",justifyContent:"center",padding:0,flexShrink:0}}>{c.active?"!":""}</button>
            <div style={{flex:1}}><span style={{color:c.active?T.text:T.dim,fontSize:"12px",textDecoration:c.active?"none":"line-through"}}>{c.text}</span><span style={{color:T.dim,fontSize:"10px",marginLeft:"6px"}}>{c.date}</span></div>
            <button onClick={()=>delCon(i)} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"12px",padding:"2px"}}>×</button>
          </div>)}
          <div style={{display:"flex",gap:"6px",marginTop:"8px"}}>
            <input style={{...inp,flex:1}} value={newCon} onChange={e=>setNewCon(e.target.value)} placeholder="Strained back, torn quad, twisted ankle..." onKeyDown={e=>{if(e.key==="Enter")addCon()}}/>
            <button onClick={addCon} style={ss.btn(true)}>Add</button>
          </div>
          <p style={{color:T.dim,fontSize:"11px",margin:"6px 0 0"}}>Active considerations are sent to Claude AI to adjust proposed workouts.</p>
        </div>
        <div style={ss.card}>
          <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>🔄 MOVEMENT SUBSTITUTIONS</div>
          {subs.length===0&&<p style={{color:T.dim,fontSize:"11px",margin:"0 0 8px"}}>No substitutions yet. Add rules so the AI knows exactly what to swap.</p>}
          {subs.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",padding:"5px 0",borderBottom:`1px solid ${T.border}18`}}>
            <span style={{color:T.red,fontSize:"11px",fontWeight:600,flex:1}}>{s.avoid}</span>
            <span style={{color:T.dim,fontSize:"11px"}}>→</span>
            <span style={{color:T.green,fontSize:"11px",fontWeight:600,flex:1}}>{s.use}</span>
            <button onClick={()=>delSub(i)} style={{background:"none",border:"none",color:T.dim,cursor:"pointer",fontSize:"12px",padding:"2px",flexShrink:0}}>×</button>
          </div>)}
          <div style={{display:"flex",gap:"4px",marginTop:"8px",alignItems:"center"}}>
            <input style={{...inp,flex:1,fontSize:"12px"}} value={newSub.avoid} onChange={e=>setNewSub(p=>({...p,avoid:e.target.value}))} placeholder="Avoid: Barbell Back Squat" onKeyDown={e=>{if(e.key==="Enter")addSub()}}/>
            <span style={{color:T.dim,fontSize:"13px",flexShrink:0}}>→</span>
            <input style={{...inp,flex:1,fontSize:"12px"}} value={newSub.use} onChange={e=>setNewSub(p=>({...p,use:e.target.value}))} placeholder="Use: Belt Squat, Leg Press" onKeyDown={e=>{if(e.key==="Enter")addSub()}}/>
            <button onClick={addSub} style={{...ss.btn(true),flexShrink:0,padding:"6px 10px"}}>+</button>
          </div>
          <p style={{color:T.dim,fontSize:"11px",margin:"6px 0 0"}}>When a consideration is active, AI uses these swaps instead of guessing. One "avoid" can map to multiple alternatives.</p>
        </div>
        <CheckInPanel client={client} onSaveCl={onSaveCl}/>
        {tl.length>0&&<div style={{display:"grid",gridTemplateColumns:tl.length>1?"1fr 1fr":"1fr",gap:"8px",overflow:"hidden"}}>
          {tl.slice(0,2).map(l=><div key={l.name} style={{...ss.card,overflow:"hidden",minWidth:0}}><div style={{color:T.sub,fontSize:"10px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px"}}>{l.short.toUpperCase()} TREND</div><Chart data={l.prog} color={l.color} h={90}/></div>)}
        </div>}
      </>}

      {tab==="next"&&<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
          <span style={{color:T.sub,fontSize:"11px"}}>Powered by Claude AI</span>
          <div style={{display:"flex",gap:"6px"}}>
            <button onClick={()=>setBuildType(buildType?null:types[0])} style={{...ss.btn(!buildType),fontSize:"11px",padding:"5px 10px"}}>{buildType?"Cancel":"Builder"}</button>
            <button onClick={generateAll} style={{...ss.btn(true),fontSize:"11px",padding:"5px 12px"}}>Generate All</button>
          </div>
        </div>
        {considerations.filter(c=>c.active).length>0&&<div style={{background:T.red+"10",border:`1px solid ${T.red}25`,borderRadius:"8px",padding:"8px 12px",marginBottom:"10px",fontSize:"11px",color:T.red}}>Active: {considerations.filter(c=>c.active).map(c=>c.text).join(", ")} — AI will adapt workouts{subs.length>0?` · ${subs.length} substitution rule${subs.length>1?"s":""}`:""}</div>}
        {(()=>{const hasRd=readiness.sleep||readiness.soreness||readiness.energy;const rc=(f,v)=>setReadiness(p=>({...p,[f]:p[f]===v?null:v}));
          const labs={sleep:["Poor","Light","Fair","Good","Great"],soreness:["None","Low","Mod","High","Severe"],energy:["Empty","Low","OK","Good","Peak"]};
          const cs=[T.green,T.green,T.accent,T.red,T.red];
          return <div style={{...ss.card,border:`1px solid ${hasRd?T.purple+"40":T.border}`,marginBottom:"10px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:exp.readiness?"10px":"0",cursor:"pointer"}} onClick={()=>tog("readiness")}>
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                <span style={{color:T.purple,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>PRE-SESSION CHECK-IN</span>
                {hasRd&&!exp.readiness&&<span style={{color:T.sub,fontSize:"11px"}}>— Sleep {readiness.sleep||"?"}/5 · Sore {readiness.soreness||"?"}/5 · Energy {readiness.energy||"?"}/5</span>}
                {!hasRd&&!exp.readiness&&<span style={{color:T.dim,fontSize:"11px"}}>(optional — helps AI adjust)</span>}
              </div>
              <span style={{color:T.sub,fontSize:"12px"}}>{exp.readiness?"▴":"▾"}</span>
            </div>
            {exp.readiness&&<div>
              {[["sleep","Sleep"],["soreness","Soreness"],["energy","Energy"]].map(([key,title])=><div key={key} style={{marginBottom:"8px"}}>
                <span style={{color:T.text,fontSize:"11px",fontWeight:600,marginRight:"8px"}}>{title}</span>
                <div style={{display:"inline-flex",gap:"4px"}}>{[1,2,3,4,5].map(v=>{const sel=readiness[key]===v;const isS=key==="soreness";const c=isS?cs[v-1]:cs[v-1];
                  return <button key={v} onClick={()=>rc(key,v)} style={{width:44,padding:"4px 2px",borderRadius:"6px",border:`1.5px solid ${sel?c:T.border}`,background:sel?c+"18":"transparent",cursor:"pointer",textAlign:"center",fontSize:"11px"}}>
                    <div style={{fontSize:"12px"}}>{labs[key][v-1]}</div>
                    <div style={{color:sel?c:T.dim,fontSize:"9px",fontWeight:600}}>{v}/5</div>
                  </button>})}</div>
              </div>)}
              <input value={readiness.note} onChange={e=>setReadiness(p=>({...p,note:e.target.value}))} placeholder="Quick note — knee tight, rough week, feeling great..." style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 10px",borderRadius:"6px",fontSize:"11px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}}/>
              {hasRd&&<div style={{color:T.dim,fontSize:"10px",marginTop:"6px"}}>✓ AI will factor this into generated workouts{readiness.soreness>=4?" — high soreness will trigger auto-deload":""}</div>}
            </div>}
          </div>})()}
        {buildType&&<WorkoutBuilder type={buildType} types={types} onTypeChange={setBuildType} allWs={sorted} onSave={(w)=>{setProposals(p=>[...p.filter(x=>x.type!==w.type),w]);setBuildType(null)}} onCancel={()=>setBuildType(null)}/>}
        {!buildType&&types.map(type => {
          const p = proposals.find(x => x.type === type);
          const loading = genLoading[type];
          const tp = pinned[type] || {};
          const hasPins = Object.values(tp).some(v=>v);
          const typePhase=getCurrentPhase(client.program,type);
          const phaseActive=typePhase&&!typePhase.completed&&!typePhase.upcoming;
          const pic=phaseActive?({low:T.green,moderate:T.accent,high:T.red,max:"#DC2626"})[typePhase.block.intensity]||T.accent:null;
          return <div key={type} style={{marginBottom:"8px"}}>
            {!p && !loading && <div style={{...ss.card,border:phaseActive?`1px solid ${pic}30`:`1px solid ${T.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><span style={{...ss.pill(TC[type]),fontSize:"11px",marginRight:"8px"}}>{type}</span><span style={{color:T.sub,fontSize:"12px"}}>No proposal yet</span></div>
                <button onClick={()=>generateForType(type)} style={{...ss.btn(true),fontSize:"11px",padding:"4px 10px"}}>Generate</button>
              </div>
              {phaseActive&&<div style={{marginTop:"6px",padding:"5px 8px",background:pic+"08",borderRadius:"4px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:pic,fontSize:"10px",fontWeight:700}}>{typePhase.block.name} · Wk {typePhase.weekInBlock}/{typePhase.block.weeks}</span>
                <span style={{color:T.sub,fontSize:"10px"}}>{typePhase.block.repRange?`${typePhase.block.repRange} reps`:"—"} · {typePhase.block.intensity||"moderate"}</span>
              </div>}
            </div>}
            {loading && <div style={{...ss.card,textAlign:"center",padding:"20px"}}>
              <div style={{color:T.accent,fontSize:"13px",fontWeight:600,marginBottom:"4px"}}>Generating {type} day...</div>
              <div style={{color:T.dim,fontSize:"11px"}}>Analyzing {sorted.filter(w=>w.type===type).length} sessions, checking injuries, selecting exercises...</div>
              <div style={{marginTop:"8px",height:"3px",background:T.border,borderRadius:"2px",overflow:"hidden"}}><div style={{height:"100%",width:"70%",background:`linear-gradient(90deg,${T.accent},${T.cyan})`,borderRadius:"2px",animation:"pulse 1.5s ease infinite"}} /></div>
            </div>}
            {p && !loading && <div>
              <WCard w={p} open={exp[p.id]!==false} toggle={()=>tog(p.id)} onChange={(nw)=>setProposals(prev=>prev.map(x=>x.type===type?nw:x))} onAction={handleAction} pinned={tp} onTogglePin={(pk)=>setPinned(prev=>({...prev,[type]:{...(prev[type]||{}), [pk]:!(prev[type]||{})[pk]}}))} onExClick={setSelEx} allExNames={allExNames}/>
              <div style={{textAlign:"right",marginTop:"-4px",marginBottom:"8px",display:"flex",justifyContent:"flex-end",gap:"10px"}}>
                {hasPins&&<button onClick={()=>generateForType(type,true)} style={{background:"none",border:"none",color:T.accent,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>Regen unpinned</button>}
                <button onClick={()=>generateForType(type)} style={{background:"none",border:"none",color:T.cyan,fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>↻ Regenerate all</button>
              </div>
            </div>}
          </div>;
        })}
        <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      </>}

      {tab==="history"&&<>
        {sorted.length===0?<div style={{...ss.card,textAlign:"center",padding:"32px 16px"}}><div style={{color:T.text,fontWeight:600,fontSize:"14px",marginBottom:"4px"}}>No workouts yet</div><div style={{color:T.dim,fontSize:"12px"}}>Generate a workout in the Next Workouts tab to get started.</div><button onClick={()=>setTab("next")} style={{...ss.btn(true),marginTop:"12px"}}>→ Next Workouts</button></div>:<>
        <div style={{display:"flex",gap:"4px",marginBottom:"8px",flexWrap:"wrap"}}>
          {["all",...getTypes(sorted)].map(f=><button key={f} onClick={()=>setFilt(f)} style={{background:filt===f?T.accent+"15":"transparent",border:`1px solid ${filt===f?T.accent+"30":T.border}`,color:filt===f?T.accent:T.sub,padding:"3px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{f} ({f==="all"?sorted.length:sorted.filter(w=>w.type===f).length})</button>)}
        </div>
        {[...filtHist].reverse().map(w=>{const isEditing=editingWId===w.id;const displayW=isEditing?editW:w;
          return <WCard key={w.id} w={displayW} open={!!exp[w.id]} toggle={()=>tog(w.id)} onExClick={setSelEx}
            editing={isEditing}
            onChange={isEditing?(nw)=>setEditW(nw):undefined}
            onEdit={()=>{setEditingWId(w.id);setEditW(JSON.parse(JSON.stringify(w)));setExp(p=>({...p,[w.id]:true}))}}
            onEditSave={()=>{onSaveW(client.id,editW);setEditingWId(null);setEditW(null)}}
            onEditCancel={()=>{setEditingWId(null);setEditW(null)}}
            onDelete={()=>onDeleteW(client.id,w.id)}
            allExNames={allExNames}
          />})}
        </>}
      </>}

      {tab==="analytics"&&<>
        {sorted.length===0?<div style={{...ss.card,textAlign:"center",padding:"32px 16px"}}><div style={{color:T.dim,fontSize:"12px",marginBottom:"4px"}}>No check-in data yet</div><div style={{color:T.text,fontWeight:600,fontSize:"14px",marginBottom:"4px"}}>No data yet</div><div style={{color:T.dim,fontSize:"12px"}}>Complete a few workouts to see trends, lift progressions, and muscle balance.</div><button onClick={()=>setTab("next")} style={{...ss.btn(true),marginTop:"12px"}}>→ Generate Workouts</button></div>:<>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${2+Math.min(tl.length,3)},1fr)`,gap:"6px",marginBottom:"12px"}}>{tl.slice(0,3).map(l=><Stat key={l.name} v={`${l.max}#`} l={`${l.short} Max`} c={l.color}/>)}<Stat v={quads.length+lowers.length} l="Leg Days" c={T.quads}/><Stat v={glutes.length} l="Glute Days" c={T.glutes}/></div>
        {(()=>{const rpeData=sorted.filter(w=>w.rpe).map(w=>({date:w.date,max:w.rpe}));const volData=sorted.map(w=>({date:w.date,max:w.blocks.reduce((a,b)=>a+b.exercises.reduce((s,e)=>s+((e.sets||0)*(e.reps||0)*(e.weight||0)),0),0)})).filter(d=>d.max>0);const avgRpe=rpeData.length?((rpeData.reduce((a,d)=>a+d.max,0)/rpeData.length).toFixed(1)):null;const avgVol=volData.length?Math.round(volData.slice(-8).reduce((a,d)=>a+d.max,0)/Math.min(volData.length,8)):null;
          return (rpeData.length>0||volData.length>0)&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
            {rpeData.length>0&&<div style={ss.card}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}><span style={{color:T.sub,fontSize:"10px",fontWeight:700,letterSpacing:"1px"}}>RPE TREND</span>{avgRpe&&<span style={{...ss.mono,color:T.accent,fontSize:"11px"}}>avg {avgRpe}</span>}</div><Chart data={rpeData} color={T.pink} h={70}/></div>}
            {volData.length>0&&<div style={ss.card}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}><span style={{color:T.sub,fontSize:"10px",fontWeight:700,letterSpacing:"1px"}}>VOLUME LOAD</span>{avgVol&&<span style={{...ss.mono,color:T.cyan,fontSize:"11px"}}>{(avgVol/1000).toFixed(1)}k avg</span>}</div><Chart data={volData} color={T.cyan} h={70}/></div>}
          </div>})()}
        {(client.checkins||[]).length>0&&<div style={ss.card}>
          <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>BODY COMPOSITION TREND</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {client.checkins.some(c=>c.weight)&&<div><div style={{color:T.dim,fontSize:"10px",marginBottom:"4px"}}>Weight</div><Chart data={client.checkins.filter(c=>c.weight).map(c=>({date:c.date,max:c.weight}))} color={T.blue} h={70}/></div>}
            {client.checkins.some(c=>c.bodyFat)&&<div><div style={{color:T.dim,fontSize:"10px",marginBottom:"4px"}}>Body Fat %</div><Chart data={client.checkins.filter(c=>c.bodyFat).map(c=>({date:c.date,max:c.bodyFat}))} color={T.pink} h={70}/></div>}
          </div>
        </div>}
        {tl.map(l=><div key={l.name} style={ss.card}><div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>{l.name.toUpperCase()}</div><Chart data={l.prog} color={l.color}/></div>)}
        <div style={ss.card}><div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>MUSCLE BALANCE (LAST 8)</div><Bars ws={sorted}/></div>
        <div style={ss.card}><div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"8px"}}>TOP EXERCISES</div>
          {topEx.map(([n,d])=><div key={n} onClick={()=>setSelEx(n)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:`1px solid ${T.border}15`,cursor:"pointer"}}><div><span style={{color:T.text,fontSize:"11px",fontWeight:500}}>{n}</span><div style={{display:"flex",gap:"2px",marginTop:"1px"}}>{(MM[n]||[]).filter(m=>m!=="Grip").slice(0,3).map(m=><Pill key={m} g={m}/>)}</div></div><div style={{textAlign:"right"}}><span style={{...ss.mono,color:T.accent,fontSize:"12px",fontWeight:600}}>{d.count}×</span>{d.lastW&&<div style={{color:T.dim,fontSize:"9px"}}>last: {d.lastW}#</div>}</div></div>)}
        </div>
        </>}
      </>}

      {tab==="program"&&<>
        {(()=>{
          const prog=client.program||{enabled:false,startDate:"",blocks:[]};
          const phase=getCurrentPhase(prog);
          const totalWks=prog.blocks?.reduce((a,b)=>a+(b.weeks||0),0)||0;
          const intColors={low:T.green,moderate:T.accent,high:T.red,max:"#DC2626"};

          if(!prog.enabled)return <div style={{padding:"12px 0"}}>
            <div style={{...ss.card,padding:"18px"}}>
              <div style={{color:T.text,fontWeight:700,fontSize:"15px",marginBottom:"8px"}}>Periodized Programming</div>
              <div style={{color:T.sub,fontSize:"12px",lineHeight:1.7,marginBottom:"12px"}}>Structure training into intentional phases — each with specific rep ranges, intensity levels, and volume targets. When enabled, the AI generates every workout to match the current phase automatically.</div>
              <div style={{color:T.sub,fontSize:"12px",lineHeight:1.7,marginBottom:"14px"}}>Without a program, the AI still creates great workouts based on history and balance — but with a program, it follows a deliberate progression arc that drives better long-term results.</div>
              <button onClick={()=>onSaveCl({...client,program:{enabled:true,startDate:new Date().toISOString().slice(0,10),blocks:[
                {name:"Hypertrophy",weeks:4,repRange:"8-12",intensity:"moderate",volumeNote:"Ascending volume — add 1-2 sets/week",notes:""},
                {name:"Strength",weeks:3,repRange:"4-6",intensity:"high",volumeNote:"Peak intensity week 2, slight taper week 3",notes:""},
                {name:"Deload",weeks:1,repRange:"10-15",intensity:"low",volumeNote:"50-60% working weights, focus on form",notes:"Recovery week"}
              ]}})} style={{...ss.btn(true),fontSize:"13px",padding:"10px 24px",width:"100%"}}>Enable Program</button>
            </div>

            <div style={{...ss.card,padding:"16px"}}>
              <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"10px"}}>WHY PERIODIZE?</div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {[
                  {t:"Avoid plateaus",d:"Rotating rep ranges and intensity prevents adaptation stalls. The body responds to novel stimulus — periodization provides that systematically."},
                  {t:"Manage fatigue",d:"Planned deload weeks prevent overtraining and reduce injury risk. High-intensity phases are balanced by recovery phases."},
                  {t:"Measurable progress",d:"Each phase has clear targets. You can track whether the client hit their rep ranges, progressed weights, and completed the cycle."},
                  {t:"Smarter AI generation",d:"Instead of generic workouts, the AI programs specifically for where the client is in their cycle — adjusting exercise selection, rep schemes, volume, and rest periods."}
                ].map((item,i)=><div key={i}>
                  <div style={{color:T.text,fontWeight:600,fontSize:"12px",marginBottom:"2px"}}>{item.t}</div>
                  <div style={{color:T.dim,fontSize:"11px",lineHeight:1.5}}>{item.d}</div>
                </div>)}
              </div>
            </div>

            <div style={{...ss.card,padding:"16px"}}>
              <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"10px"}}>HOW IT WORKS</div>
              <div style={{color:T.sub,fontSize:"11px",lineHeight:1.7}}>
                <div style={{marginBottom:"8px"}}><span style={{color:T.text,fontWeight:600}}>1. Set up phases</span> — Define training blocks like Hypertrophy (8-12 reps), Strength (4-6 reps), and Deload (light recovery). Choose how many weeks each phase runs.</div>
                <div style={{marginBottom:"8px"}}><span style={{color:T.text,fontWeight:600}}>2. Customize per workout type</span> — If {client.name} does both upper and lower days, you can run upper body in hypertrophy while lower body is in strength — or keep them synced.</div>
                <div style={{marginBottom:"8px"}}><span style={{color:T.text,fontWeight:600}}>3. Generate workouts</span> — The AI reads the active phase, week number, rep range, and intensity, then builds workouts that honor those parameters exactly.</div>
                <div><span style={{color:T.text,fontWeight:600}}>4. Auto-advance</span> — The program tracks which week you're in based on the start date. When one phase ends, the next begins. After the last phase, the cycle is complete.</div>
              </div>
            </div>

            <div style={{color:T.dim,fontSize:"11px",textAlign:"center",padding:"8px"}}>Optional — {client.name} can continue training without a program.</div>
          </div>;

          const upProg=(updates)=>onSaveCl({...client,program:{...prog,...updates}});
          const upBlock=(i,updates)=>{const nb=[...prog.blocks];nb[i]={...nb[i],...updates};upProg({blocks:nb})};
          const addBlock=()=>upProg({blocks:[...prog.blocks,{name:"New Phase",weeks:4,repRange:"8-12",intensity:"moderate",volumeNote:"",notes:""}]});
          const delBlock=(i)=>{if(prog.blocks.length<=1)return;upProg({blocks:prog.blocks.filter((_,j)=>j!==i)})};
          const moveBlk=(i,dir)=>{const nb=[...prog.blocks];const ti=i+dir;if(ti<0||ti>=nb.length)return;[nb[i],nb[ti]]=[nb[ti],nb[i]];upProg({blocks:nb})};

          return <>
            {phase&&!phase.completed&&!phase.upcoming&&<div style={{...ss.card,border:`1px solid ${(intColors[phase.block.intensity]||T.accent)}30`,background:(intColors[phase.block.intensity]||T.accent)+"06",padding:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                <span style={{color:intColors[phase.block.intensity]||T.accent,fontSize:"13px",fontWeight:700}}>{phase.block.name}</span>
                <span style={{...ss.mono,fontSize:"12px",color:T.text,fontWeight:600}}>Week {phase.weekInBlock} of {phase.block.weeks}</span>
              </div>
              <div style={{color:T.sub,fontSize:"11px",marginBottom:"6px"}}>Overall progress: week {phase.weekTotal} of {phase.totalWeeks}{phase.block.repRange?` · Target reps: ${phase.block.repRange}`:""}{phase.block.intensity?` · Intensity: ${phase.block.intensity}`:""}</div>
              <div style={{height:6,borderRadius:3,background:T.border,overflow:"hidden",marginBottom:"8px"}}><div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,${intColors[phase.block.intensity]||T.accent},${intColors[phase.block.intensity]||T.accent}80)`,width:`${Math.round((phase.weekTotal/phase.totalWeeks)*100)}%`,transition:"width .3s"}}/></div>
              <div style={{color:T.dim,fontSize:"10px",lineHeight:1.6,fontStyle:"italic"}}>{
                phase.weekInBlock===1&&phase.block.weeks>1?"Week 1 — AI will focus on establishing working weights at the new rep range. Expect moderate loads while the client adapts.":
                phase.weekInBlock===phase.block.weeks&&phase.block.weeks>2?"Final week of phase — AI will peak volume or begin tapering depending on phase type. Good time to test maxes in strength phases.":
                phase.block.intensity==="low"||phase.block.name.toLowerCase().includes("deload")?"Deload phase — AI will reduce weights 40-50%, keep reps moderate, and emphasize form and mobility.":
                phase.weekInBlock>1&&phase.weekInBlock<phase.block.weeks?"Mid-phase — AI is building progressively. Watch for RPE creep and adjust if needed.":
                "AI is generating within phase parameters."
              }</div>
            </div>}
            {phase?.completed&&<div style={{...ss.card,border:`1px solid ${T.green}30`,textAlign:"center",padding:"16px"}}>
              <div style={{color:T.green,fontWeight:700,fontSize:"13px"}}>Program Complete</div>
              <div style={{color:T.sub,fontSize:"11px",marginTop:"2px"}}>All {phase.totalWeeks} weeks finished. Edit below to start a new cycle.</div>
            </div>}

            <div style={ss.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                <span style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px"}}>PROGRAM SETTINGS</span>
                <button onClick={()=>upProg({enabled:false})} style={{background:"none",border:"none",color:T.dim,fontSize:"10px",cursor:"pointer",fontFamily:"inherit"}}>Disable Program</button>
              </div>
              <div style={{color:T.dim,fontSize:"10px",lineHeight:1.5,marginBottom:"10px"}}>The start date determines which phase and week the AI generates for. Workouts are automatically assigned to the correct phase based on elapsed weeks.</div>
              <label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Start Date</label>
              <input type="date" style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"8px 10px",borderRadius:"6px",fontSize:"13px",fontFamily:"inherit",marginBottom:"10px"}} value={prog.startDate||""} onChange={e=>upProg({startDate:e.target.value})}/>
              <div style={{color:T.dim,fontSize:"10px",marginBottom:"4px"}}>Total: {totalWks} weeks ({Math.round(totalWks/4.3)} months) · End: {prog.startDate?new Date(new Date(prog.startDate+"T12:00:00").getTime()+totalWks*7*86400000).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"—"}</div>
            </div>

            <div style={{...ss.card,padding:"14px"}}>
              <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px"}}>PHASE TIMELINE</div>
              <div style={{color:T.dim,fontSize:"10px",lineHeight:1.5,marginBottom:"8px"}}>Phases run left-to-right. The colored bar shows relative duration — wider blocks run longer. Drag, add, or remove phases below.</div>
              <div style={{display:"flex",gap:"2px",height:"8px",borderRadius:"4px",overflow:"hidden",marginBottom:"8px"}}>
                {prog.blocks.map((b,i)=><div key={i} style={{flex:b.weeks||1,background:intColors[b.intensity]||T.accent,opacity:phase&&!phase.completed&&!phase.upcoming&&phase.blockIndex===i?1:0.4,transition:"opacity .3s"}}/>)}
              </div>
              <div style={{display:"flex",gap:"2px"}}>
                {prog.blocks.map((b,i)=><div key={i} style={{flex:b.weeks||1,textAlign:"center"}}><span style={{color:phase&&!phase.completed&&!phase.upcoming&&phase.blockIndex===i?T.text:T.dim,fontSize:"9px",fontWeight:600}}>{b.name}</span></div>)}
              </div>
            </div>

            {prog.blocks.map((b,i)=>{
              const isCurrent=phase&&!phase.completed&&!phase.upcoming&&phase.blockIndex===i;
              const ic=intColors[b.intensity]||T.accent;
              return <div key={i} style={{...ss.card,border:isCurrent?`2px solid ${ic}40`:`1px solid ${T.border}`,background:isCurrent?ic+"04":T.card}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{...ss.mono,color:T.dim,fontSize:"11px",fontWeight:700}}>{i+1}</span>
                    {isCurrent&&<span style={{background:ic+"20",color:ic,fontSize:"9px",fontWeight:700,padding:"1px 6px",borderRadius:"3px"}}>CURRENT</span>}
                  </div>
                  <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
                    <button onClick={()=>moveBlk(i,-1)} disabled={i===0} style={{background:"none",border:"none",color:i===0?T.border:T.sub,fontSize:"14px",cursor:"pointer",padding:"2px"}}>↑</button>
                    <button onClick={()=>moveBlk(i,1)} disabled={i===prog.blocks.length-1} style={{background:"none",border:"none",color:i===prog.blocks.length-1?T.border:T.sub,fontSize:"14px",cursor:"pointer",padding:"2px"}}>↓</button>
                    {prog.blocks.length>1&&<button onClick={()=>delBlock(i)} style={{background:"none",border:"none",color:T.red+"80",fontSize:"14px",cursor:"pointer",padding:"2px"}}>×</button>}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 60px",gap:"6px",marginBottom:"6px"}}>
                  <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Phase Name</label><input style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}} value={b.name} onChange={e=>upBlock(i,{name:e.target.value})}/></div>
                  <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Weeks</label><input type="number" min="1" max="12" style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}} value={b.weeks||""} onChange={e=>upBlock(i,{weeks:parseInt(e.target.value)||0})}/></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"6px"}}>
                  <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Rep Range <span style={{color:T.dim,fontWeight:400}}>— AI keeps all working sets here</span></label><input style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}} value={b.repRange||""} onChange={e=>upBlock(i,{repRange:e.target.value})} placeholder="e.g. 8-12"/>{b.repRange&&<div style={{color:T.dim,fontSize:"9px",marginTop:"2px",lineHeight:1.4}}>{(()=>{const r=b.repRange;if(/[1-5]/.test(r)&&!r.includes("1"))return"Strength zone: heavy compound lifts, longer rest (2-3 min)";if(/[8-9]|1[0-2]/.test(r))return"Hypertrophy zone: moderate load, controlled tempo, growth focus";if(/1[2-9]|[2-9]0/.test(r))return"Endurance/deload zone: lighter loads, shorter rest, metabolic stress";return""})()}</div>}</div>
                  <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Intensity <span style={{color:T.dim,fontWeight:400}}>— controls weight selection & effort</span></label>
                    <div style={{display:"flex",gap:"3px"}}>{["low","moderate","high","max"].map(lv=><button key={lv} onClick={()=>upBlock(i,{intensity:lv})} style={{flex:1,padding:"5px 0",borderRadius:"4px",border:`1px solid ${b.intensity===lv?(intColors[lv]||T.accent):T.border}`,background:b.intensity===lv?(intColors[lv]||T.accent)+"15":"transparent",color:b.intensity===lv?(intColors[lv]||T.accent):T.dim,fontSize:"10px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{lv}</button>)}</div>
                    {b.intensity&&<div style={{color:T.dim,fontSize:"9px",marginTop:"2px",lineHeight:1.4}}>{({low:"RPE 5-6 · Recovery/deload — AI cuts volume ~40-50%, prioritizes form and mobility",moderate:"RPE 7-8 · Standard training — challenging but sustainable, room to grow each week",high:"RPE 8-9 · Demanding — AI pushes heavier loads, may add drop sets or tempo work",max:"RPE 9-10 · Peaking — near-max effort, use for 1-2 weeks only to avoid burnout"})[b.intensity]||""}</div>}
                  </div>
                </div>
                <div style={{marginBottom:"4px"}}><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Volume / Progression <span style={{color:T.dim,fontWeight:400}}>— tells AI how to scale sets & load across weeks</span></label><input style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}} value={b.volumeNote||""} onChange={e=>upBlock(i,{volumeNote:e.target.value})} placeholder="e.g. Add 1-2 sets/wk, ascending load"/></div>
                <div style={{marginBottom:"6px"}}><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Trainer Notes <span style={{color:T.dim,fontWeight:400}}>— extra AI instructions: focus areas, exercise preferences, etc.</span></label><input style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"6px 8px",borderRadius:"4px",fontSize:"12px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}} value={b.notes||""} onChange={e=>upBlock(i,{notes:e.target.value})} placeholder="e.g. Emphasize posterior chain, include tempo work"/></div>
                {types.length>1&&<div style={{marginTop:"6px",borderTop:`1px solid ${T.border}18`,paddingTop:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                    <span style={{color:T.sub,fontSize:"10px",fontWeight:700,letterSpacing:".5px"}}>PER-TYPE OVERRIDES</span>
                  </div>
                  <div style={{color:T.dim,fontSize:"9px",lineHeight:1.5,marginBottom:"6px"}}>Different workout types can run different parameters within the same phase. For example, keep upper body in hypertrophy (8-12 reps) while lower body runs strength (4-6 reps). Leave blank to use the phase defaults above.</div>
                  <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(types.length,3)},1fr)`,gap:"4px"}}>
                    {types.map(t=>{const ov=(b.typeOverrides||{})[t]||{};const tc2=TC[t]||T.accent;const hasOv=ov.repRange||ov.intensity;
                      return <div key={t} style={{background:hasOv?tc2+"06":T.surface,border:`1px solid ${hasOv?tc2+"30":T.border}`,borderRadius:"6px",padding:"6px 8px"}}>
                        <span style={{color:tc2,fontSize:"10px",fontWeight:700,textTransform:"uppercase",display:"block",marginBottom:"4px"}}>{t}</span>
                        <input style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,padding:"4px 6px",borderRadius:"4px",fontSize:"11px",fontFamily:"inherit",width:"100%",boxSizing:"border-box",marginBottom:"3px"}} value={ov.repRange||""} onChange={e=>{const nOv={...ov,repRange:e.target.value};const to={...(b.typeOverrides||{}),[t]:nOv};upBlock(i,{typeOverrides:to})}} placeholder={b.repRange||"reps"}/>
                        <div style={{display:"flex",gap:"2px"}}>{["low","moderate","high"].map(lv=>{const sel=(ov.intensity||"")=== lv;return <button key={lv} onClick={()=>{const nOv={...ov,intensity:sel?"":lv};const to={...(b.typeOverrides||{}),[t]:nOv};upBlock(i,{typeOverrides:to})}} style={{flex:1,padding:"3px 0",borderRadius:"3px",border:`1px solid ${sel?(intColors[lv]||T.accent):T.border}`,background:sel?(intColors[lv]||T.accent)+"15":"transparent",color:sel?(intColors[lv]||T.accent):T.dim,fontSize:"8px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{lv.slice(0,3)}</button>})}</div>
                      </div>})}
                  </div>
                </div>}
              </div>})}
            <button onClick={addBlock} style={{background:"none",border:`1px dashed ${T.border}`,color:T.dim,padding:"10px",borderRadius:"8px",width:"100%",fontSize:"12px",cursor:"pointer",fontFamily:"inherit",marginBottom:"8px"}}>+ Add Phase</button>

            {/* Generate from Program CTA */}
            {phase&&!phase.completed&&<div style={{...ss.card,border:`1px solid ${T.accent}30`,background:T.accent+"06",padding:"14px",marginBottom:"8px"}}>
              <div style={{color:T.text,fontWeight:600,fontSize:"13px",marginBottom:"4px"}}>Ready to generate</div>
              <div style={{color:T.sub,fontSize:"11px",lineHeight:1.5,marginBottom:"10px"}}>AI will build {phase.block?.name||"current"} phase workouts — week {phase?.weekInBlock||"?"} parameters ({phase.block?.repRange||"standard"} reps, {phase.block?.intensity||"moderate"} intensity). Any per-type overrides will apply automatically.</div>
              <div style={{display:"flex",gap:"8px",justifyContent:"center"}}>
                <button onClick={()=>setTab("next")} style={{...ss.btn(false),fontSize:"11px",padding:"6px 14px"}}>View Next Workouts</button>
                <button onClick={()=>{setTab("next");setTimeout(()=>generateAll(),100)}} style={{...ss.btn(true),fontSize:"11px",padding:"6px 14px"}}>Generate All from Program</button>
              </div>
            </div>}

            <div style={ss.card}>
              <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px"}}>QUICK TEMPLATES</div>
              <div style={{color:T.dim,fontSize:"10px",lineHeight:1.5,marginBottom:"10px"}}>Pre-built mesocycles for common training goals. Tap to load — you can customize every field after.</div>
              <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                {[
                  {label:"Hypertrophy → Strength → Deload",who:"Most clients — classic muscle-building into strength testing",desc:"4 weeks building volume at moderate intensity, 3 weeks of heavier low-rep work, then 1 week of active recovery. The go-to structure for intermediate lifters.",blocks:[{name:"Hypertrophy",weeks:4,repRange:"8-12",intensity:"moderate",volumeNote:"Ascending volume — add 1-2 sets/week",notes:""},{name:"Strength",weeks:3,repRange:"4-6",intensity:"high",volumeNote:"Peak intensity week 2, slight taper week 3",notes:""},{name:"Deload",weeks:1,repRange:"10-15",intensity:"low",volumeNote:"50-60% working weights, focus on form",notes:"Recovery week"}]},
                  {label:"Linear Progression",who:"Newer clients or coming back from a break",desc:"Gradual ramp from moderate to peak intensity over 9 weeks. Foundation phase establishes working weights, Build phase adds load weekly, Peak phase tests limits, then Deload.",blocks:[{name:"Foundation",weeks:3,repRange:"10-12",intensity:"moderate",volumeNote:"Establish working weights, focus on form",notes:""},{name:"Build",weeks:3,repRange:"6-8",intensity:"high",volumeNote:"Add 5-10% weight each week",notes:""},{name:"Peak",weeks:2,repRange:"3-5",intensity:"max",volumeNote:"Test new maxes week 2",notes:"Heavy singles/doubles OK"},{name:"Deload",weeks:1,repRange:"12-15",intensity:"low",volumeNote:"Active recovery, mobility focus",notes:""}]},
                  {label:"Body Recomp",who:"Fat loss + muscle gain — higher volume, metabolic stress",desc:"4 weeks of high-volume moderate work (burns calories, builds muscle), 3 weeks of heavier strength work (preserves muscle during deficit), then recovery.",blocks:[{name:"Volume",weeks:4,repRange:"10-15",intensity:"moderate",volumeNote:"High volume, moderate weight, short rest periods",notes:"Metabolic stress focus, supersets encouraged"},{name:"Strength",weeks:3,repRange:"5-8",intensity:"high",volumeNote:"Heavy compounds, longer rest",notes:""},{name:"Active Recovery",weeks:1,repRange:"12-20",intensity:"low",volumeNote:"Light circuits, mobility, flexibility",notes:""}]},
                  {label:"Peaking (Competition Prep)",who:"Preparing for a 1RM test, powerlifting meet, or sport season",desc:"Accumulation phase builds work capacity, then intensity ramps up while volume drops, finishing with a taper into test day.",blocks:[{name:"Accumulation",weeks:3,repRange:"8-10",intensity:"moderate",volumeNote:"Build work capacity, high total volume",notes:""},{name:"Intensification",weeks:3,repRange:"3-5",intensity:"high",volumeNote:"Drop volume 20-30%, increase weight weekly",notes:"Competition lifts priority"},{name:"Taper",weeks:1,repRange:"1-3",intensity:"max",volumeNote:"Minimal volume, openers only",notes:"Rest before test day"},{name:"Deload",weeks:1,repRange:"10-15",intensity:"low",volumeNote:"Post-meet recovery",notes:""}]},
                  {label:"Beginner (12 Week)",who:"Brand new to lifting — learning movements, building base",desc:"Extended foundation phase for movement proficiency, a gentle build phase to introduce progressive overload, then structured recovery. Longer phases build consistency habits.",blocks:[{name:"Foundation",weeks:5,repRange:"12-15",intensity:"low",volumeNote:"Learn movement patterns, light weights",notes:"Prioritize form over load"},{name:"Build",weeks:4,repRange:"8-12",intensity:"moderate",volumeNote:"Slowly add weight when form is solid",notes:""},{name:"Strength Intro",weeks:2,repRange:"6-8",intensity:"high",volumeNote:"First exposure to heavier loads",notes:"Compounds only"},{name:"Deload",weeks:1,repRange:"12-15",intensity:"low",volumeNote:"Reinforce form, active recovery",notes:""}]},
                  {label:"Injury Return / Rehab",who:"Returning from injury or extended break",desc:"Conservative ramp with long low-intensity phase, slow progression, and frequent recovery. Prioritizes rebuilding movement quality and confidence.",blocks:[{name:"Rebuild",weeks:4,repRange:"15-20",intensity:"low",volumeNote:"Very light, high rep, rebuild movement patterns",notes:"Avoid aggravating exercises, focus on stability"},{name:"Strengthen",weeks:4,repRange:"10-12",intensity:"moderate",volumeNote:"Gradually reintroduce load",notes:"Monitor pain/discomfort closely"},{name:"Return",weeks:3,repRange:"6-10",intensity:"moderate",volumeNote:"Normal training volume, cautious loading",notes:""},{name:"Deload",weeks:1,repRange:"12-15",intensity:"low",volumeNote:"Recovery and assessment",notes:"Evaluate readiness for full programs"}]}
                ].map(t=><div key={t.label}>
                  <button onClick={()=>upProg({blocks:t.blocks,startDate:prog.startDate||new Date().toISOString().slice(0,10)})} style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"10px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",width:"100%",textAlign:"left"}}>
                    <div style={{marginBottom:"2px"}}>{t.label}</div>
                    <div style={{color:T.accent,fontSize:"10px",fontWeight:500,marginBottom:"2px"}}>{t.who}</div>
                    <div style={{color:T.dim,fontSize:"10px",fontWeight:400,lineHeight:1.4}}>{t.desc}</div>
                  </button>
                </div>)}
              </div>
              </div>
            </div>

            <div style={{...ss.card,padding:"16px"}}>
              <div style={{color:T.sub,fontSize:"11px",fontWeight:700,letterSpacing:"1px",marginBottom:"10px"}}>PROGRAMMING REFERENCE GUIDE</div>

              <div style={{marginBottom:"12px"}}>
                <div style={{color:T.text,fontWeight:600,fontSize:"11px",marginBottom:"4px"}}>Intensity Levels — What the AI Does</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px"}}>
                  {[
                    {lv:"Low",c:T.green,d:"40-60% of max. High reps, light weights. Used for deloads, recovery, and rehab phases. AI selects lighter variations and adds mobility work."},
                    {lv:"Moderate",c:T.accent,d:"60-75% of max. Primary hypertrophy zone. AI balances compound and isolation movements with moderate rest periods."},
                    {lv:"High",c:T.red,d:"75-90% of max. Strength-focused. AI prioritizes heavy compound lifts, longer rest periods, and fewer total exercises per session."},
                    {lv:"Max",c:"#DC2626",d:"90%+ of max. Peaking only. AI programs heavy singles/doubles/triples with extended rest. Use sparingly — 1-2 weeks max."}
                  ].map(x=><div key={x.lv} style={{background:x.c+"06",border:`1px solid ${x.c}20`,borderRadius:"6px",padding:"8px"}}>
                    <div style={{color:x.c,fontSize:"10px",fontWeight:700,marginBottom:"2px"}}>{x.lv.toUpperCase()}</div>
                    <div style={{color:T.dim,fontSize:"9px",lineHeight:1.5}}>{x.d}</div>
                  </div>)}
                </div>
              </div>

              <div style={{marginBottom:"12px"}}>
                <div style={{color:T.text,fontWeight:600,fontSize:"11px",marginBottom:"4px"}}>Rep Ranges — Quick Reference</div>
                <div style={{color:T.dim,fontSize:"10px",lineHeight:1.7}}>
                  <span style={{color:T.text,fontWeight:600}}>1-5 reps:</span> Pure strength / neural. Heavy weight, long rest (3-5 min). Best for compound movements.{" "}
                  <span style={{color:T.text,fontWeight:600}}>6-8 reps:</span> Strength-hypertrophy blend. Heavy but with enough volume for growth.{" "}
                  <span style={{color:T.text,fontWeight:600}}>8-12 reps:</span> Classic hypertrophy. Best for muscle growth with most clients.{" "}
                  <span style={{color:T.text,fontWeight:600}}>12-15 reps:</span> Endurance-hypertrophy. Good for beginners, metabolic work, and deloads.{" "}
                  <span style={{color:T.text,fontWeight:600}}>15-20+:</span> Muscular endurance / rehab. Very light, focus on blood flow and movement quality.
                </div>
              </div>

              <div style={{marginBottom:"12px"}}>
                <div style={{color:T.text,fontWeight:600,fontSize:"11px",marginBottom:"4px"}}>Volume / Progression Notes — How to Write Them</div>
                <div style={{color:T.dim,fontSize:"10px",lineHeight:1.7}}>
                  This field is passed directly to the AI as instructions for how to scale the workout across weeks. Be specific.
                  Good examples: "Add 1 set per exercise each week", "Increase weight 5% weekly, keep reps constant", "Week 1: 3 sets, Week 2: 4 sets, Week 3: 3 sets (taper)", "Short rest periods (45-60s), superset everything", "RPE 7 week 1, RPE 8 week 2, RPE 9 week 3".
                </div>
              </div>

              <div style={{marginBottom:"12px"}}>
                <div style={{color:T.text,fontWeight:600,fontSize:"11px",marginBottom:"4px"}}>Trainer Notes — Advanced AI Instructions</div>
                <div style={{color:T.dim,fontSize:"10px",lineHeight:1.7}}>
                  Anything you type in the Trainer Notes field is injected into the AI prompt. Use it for specific instructions:
                  exercise preferences ("Include barbell RDL and hip thrusters every session"),
                  tempo work ("Add 3-second eccentrics on all isolation exercises"),
                  technique focus ("Emphasize bracing cues, include paused reps"),
                  structure ("Use A/B split format", "Pair push/pull in supersets"),
                  or anything else you'd tell an assistant coach.
                </div>
              </div>

              <div>
                <div style={{color:T.text,fontWeight:600,fontSize:"11px",marginBottom:"4px"}}>When to Use Per-Type Overrides</div>
                <div style={{color:T.dim,fontSize:"10px",lineHeight:1.7}}>
                  Per-type overrides let you run different parameters for different workout types within the same phase. Common scenarios:
                  run upper body in hypertrophy (8-12 reps, moderate) while lower body is in strength (4-6 reps, high) to stagger recovery;
                  keep glute days at higher reps (12-15) while quad days go heavier (6-8);
                  or reduce intensity on push days if the client has a shoulder issue while keeping pull days at full intensity.
                  If all workout types should follow the same parameters, leave overrides blank.
                </div>
              </div>
            </div>
          </>;
        })()}
      </>}
    </div>
    {selEx&&<ExProg name={selEx} ws={sorted} onClose={()=>setSelEx(null)}/>}
  </div>;
}

function AddClient({onSave,onCancel}){
  const[name,setName]=useState("");const[full,setFull]=useState("");const[email,setEmail]=useState("");const[phone,setPhone]=useState("");const[goals,setGoals]=useState("");const[schedNotes,setSchedNotes]=useState("");const[focus,setFocus]=useState("");
  const[dob,setDob]=useState("");const[gender,setGender]=useState("");const[startWt,setStartWt]=useState("");const[schedDays,setSchedDays]=useState([]);
  const[wTypes,setWTypes]=useState(["upper","lower","glute"]);
  const allTypes=["quad","lower","glute","upper","push","pull","full"];
  const toggleType=t=>setWTypes(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const toggleDay=d=>setSchedDays(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const colors=[T.accent,T.blue,T.green,T.purple,T.pink,T.cyan,T.red];const[color,setColor]=useState(T.blue);
  const inp={background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"8px 10px",borderRadius:"6px",fontSize:"13px",fontFamily:"inherit",width:"100%",boxSizing:"border-box"};
  return <div><div style={ss.header}><div style={{display:"flex",alignItems:"center",gap:"8px"}}><button onClick={onCancel} style={{background:"none",border:"none",color:T.sub,fontSize:"18px",cursor:"pointer"}}>‹</button><h2 style={{margin:0,fontSize:"16px"}}>New Client</h2></div></div>
    <div style={ss.content}><div style={ss.card}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"8px"}}>
        <div><label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Name *</label><input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder="Pat"/></div>
        <div><label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Full Name</label><input style={inp} value={full} onChange={e=>setFull(e.target.value)} placeholder="Patrick Smith"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"8px"}}>
        <div><label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Email</label><input type="email" style={inp} value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@example.com"/></div>
        <div><label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Phone</label><input type="tel" style={inp} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(555) 123-4567"/></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px",marginBottom:"8px"}}>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Date of Birth</label><input type="date" style={inp} value={dob} onChange={e=>setDob(e.target.value)}/></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Gender</label><select style={{...inp,appearance:"auto"}} value={gender} onChange={e=>setGender(e.target.value)}><option value="">—</option><option value="M">Male</option><option value="F">Female</option><option value="Other">Other</option></select></div>
        <div><label style={{color:T.dim,fontSize:"10px",display:"block",marginBottom:"2px"}}>Start Weight</label><input style={inp} value={startWt} onChange={e=>setStartWt(e.target.value)} placeholder="lbs"/></div>
      </div>
      <label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"4px"}}>Training Days</label>
      <div style={{display:"flex",gap:"4px",marginBottom:"4px"}}>{[["M","Mon"],["T","Tue"],["W","Wed"],["TH","Thu"],["F","Fri"],["S","Sat"],["SU","Sun"]].map(([k,l])=><button key={k} onClick={()=>toggleDay(k)} style={{width:36,height:32,borderRadius:"6px",border:`1.5px solid ${schedDays.includes(k)?T.accent:T.border}`,background:schedDays.includes(k)?T.accent+"15":T.card,color:schedDays.includes(k)?T.accent:T.dim,fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>{l}</button>)}</div>
      <input style={{...inp,marginBottom:"10px",fontSize:"12px"}} value={schedNotes} onChange={e=>setSchedNotes(e.target.value)} placeholder="e.g. Mornings, 5:30 PM, alternating weeks..."/>
      <label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"4px"}}>Workout Types *</label>
      <div style={{display:"flex",gap:"5px",marginBottom:"10px",flexWrap:"wrap"}}>{allTypes.map(t=><button key={t} onClick={()=>toggleType(t)} style={{background:wTypes.includes(t)?(TC[t]||T.accent)+"20":"transparent",border:`1px solid ${wTypes.includes(t)?(TC[t]||T.accent)+"50":T.border}`,color:wTypes.includes(t)?(TC[t]||T.accent):T.dim,padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{t}</button>)}</div>
      <label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Focus Areas</label><textarea style={{...inp,height:"60px",resize:"vertical",marginBottom:"8px"}} value={focus} onChange={e=>setFocus(e.target.value)}/>
      <label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"3px"}}>Goals</label><textarea style={{...inp,height:"50px",resize:"vertical",marginBottom:"8px"}} value={goals} onChange={e=>setGoals(e.target.value)}/>
      <label style={{color:T.dim,fontSize:"11px",display:"block",marginBottom:"4px"}}>Color</label>
      <div style={{display:"flex",gap:"6px",marginBottom:"12px"}}>{colors.map(c=><div key={c} onClick={()=>setColor(c)} style={{width:26,height:26,borderRadius:"4px",background:c,cursor:"pointer",border:color===c?`2px solid ${T.text}`:"2px solid transparent"}}/>)}</div>
      <button onClick={()=>{if(name&&wTypes.length)onSave({id:name.toLowerCase().replace(/\s+/g,"-"),name,fullName:full||name,email,phone,scheduleDays:schedDays,scheduleNotes:schedNotes,goals,focusAreas:focus,workoutTypes:wTypes,startDate:new Date().toISOString().slice(0,10),color,dob,gender,startingWeight:startWt,considerations:[],checkins:[]})}} style={{...ss.btn(true),width:"100%",padding:"10px"}} disabled={!name||!wTypes.length}>Create Client</button>
    </div></div></div>;
}

export default function Forge(){
  const{clients,workouts,proposals,loading,saveW,deleteW,saveCl,saveProposals,clearProposals}=useForge();
  const[view,setView]=useState("dashboard");const[cid,setCid]=useState(null);const[initTab,setInitTab]=useState(null);const[showPicker,setShowPicker]=useState(false);
  const[navHidden,setNavHidden]=useState(false);
  const scrollRef=useRef({y:0,dir:"up"});
  useEffect(()=>{const onScroll=()=>{const y=window.scrollY;const dy=y-scrollRef.current.y;if(dy>8&&y>60){setNavHidden(true);if(showPicker)setShowPicker(false)}else if(dy<-5)setNavHidden(false);scrollRef.current.y=y};window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[showPicker]);
  const nav=(v,id,tab)=>{if(v==="client"){setView("client");setCid(id);setInitTab(tab||null)}else if(v==="addClient")setView("addClient");else if(v==="trainerStats")setView("trainerStats");else{setView("dashboard");setInitTab(null)}};
  const client=clients.find(c=>c.id===cid);
  if(loading)return <div style={{...ss.page,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center"}}><div style={{color:T.accent,fontSize:"24px",fontWeight:700}}>FORGE <span style={{color:T.cyan,fontSize:"14px"}}>AI</span></div><div style={{color:T.sub,fontSize:"12px"}}>Loading...</div></div></div>;
  return <div style={ss.page}>
    
    {view==="addClient"?<AddClient onSave={async c=>{await saveCl(c);nav("client",c.id)}} onCancel={()=>nav("dashboard")}/>
    :view==="trainerStats"?<TrainerStats clients={clients} workouts={workouts} onBack={()=>nav("dashboard")}/>
    :view==="client"&&client?<ClientView client={client} ws={workouts[cid]||[]} proposals={proposals[cid]||[]} onSaveProposals={(p)=>saveProposals(cid,p)} onClearProposals={()=>clearProposals(cid)} onNav={nav} onSaveW={saveW} onDeleteW={deleteW} onSaveCl={saveCl} initTab={initTab}/>
    :<Dashboard clients={clients} workouts={workouts} proposals={proposals} onNav={nav}/>}
    {showPicker&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.25)"}} onClick={()=>setShowPicker(false)}>
        <div onClick={e=>e.stopPropagation()} style={{position:"fixed",bottom:48,left:8,right:8,background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",boxShadow:"0 -4px 20px rgba(0,0,0,0.12)",padding:"10px",maxHeight:"50vh",overflowY:"auto"}}>
          <div style={{color:T.dim,fontSize:"10px",fontWeight:700,letterSpacing:"1px",marginBottom:"6px",padding:"2px 4px"}}>ALL CLIENTS</div>
          {clients.map(c=>{const ws=workouts[c.id]||[];const lastW=ws.length?ws[ws.length-1]:null;const lastDate=lastW?new Date(lastW.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
            return <button key={c.id} onClick={()=>{nav("client",c.id);setShowPicker(false)}} style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",padding:"8px",borderRadius:"8px",border:"none",background:cid===c.id?T.accent+"10":"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
            <span style={{width:32,height:32,borderRadius:"6px",background:cid===c.id?T.accent:(c.color||T.accent),display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:700,color:T.bg,flexShrink:0}}>{c.name[0]}</span>
            <div style={{flex:1}}><div style={{color:cid===c.id?T.accent:T.text,fontSize:"13px",fontWeight:600}}>{c.fullName||c.name}</div><div style={{color:T.dim,fontSize:"11px"}}>{ws.length} sessions{lastDate?` · Last: ${lastDate}`:""}</div></div>
            {cid===c.id&&<span style={{color:T.accent,fontSize:"10px",fontWeight:700}}>●</span>}
          </button>})}
          <button onClick={()=>{nav("addClient");setShowPicker(false)}} style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",padding:"8px",borderRadius:"8px",border:`1px dashed ${T.border}`,background:"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginTop:"4px"}}>
            <span style={{width:32,height:32,borderRadius:"6px",background:T.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",color:T.dim,flexShrink:0}}>+</span>
            <span style={{color:T.sub,fontSize:"13px",fontWeight:500}}>Add New Client</span>
          </button>
        </div>
      </div>}
    <div style={{...ss.navBar,transform:navHidden&&!showPicker?"translateY(100%)":"translateY(0)"}}>
      <button onClick={()=>nav("dashboard")} style={ss.navBtn(view==="dashboard")}><span style={{fontSize:"16px"}}>⌂</span>Home</button>
      <button onClick={()=>setShowPicker(!showPicker)} style={{...ss.navBtn(view==="client"||showPicker),padding:"3px 10px",flex:1.2}}>
        {view==="client"&&client?<><span style={{width:22,height:22,borderRadius:"4px",background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:T.bg}}>{client.name[0]}</span><span style={{fontSize:"10px",maxWidth:"60px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{client.name}</span></>
        :<><span style={{fontSize:"14px",fontWeight:600}}>⊞</span><span style={{fontSize:"10px"}}>Clients</span></>}
      </button>
      <button onClick={()=>nav("trainerStats")} style={ss.navBtn(view==="trainerStats")}><span style={{fontSize:"14px",fontWeight:600}}>◈</span>Stats</button>
    </div>
  </div>;
}
