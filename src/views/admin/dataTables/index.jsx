/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import graph from "assets/img/graph.jpeg"
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

export default function Settings() {

  function sketch(p5) {
    var noNodes = 200;
    var noConn = 60;
    var gravityConstant = 1.1;
    var forceConstant = 1000;
    var physics = true;
    let zoom = 0.8;
    let offsetX = 0;
    let offsetY = 0;
    var nodes = [];
    var nodeCon = [];
    var clicked = false;
    var lerpValue = 0.2;
    var startDisMultiplier = 10;
    var closeNode;
    var closeNodeMag;
    var width = 1100
    var height = 700
    var lastMouseX = 0;
    var lastMouseY = 0;

    p5.setup = () => {
      p5.createCanvas(width, height, p5.WEBGL);
      p5.fill(0);

      for (let i = 0; i < noNodes; i++) {
        let x = p5.random(-startDisMultiplier * width, startDisMultiplier * width)
        let y = p5.random(-startDisMultiplier * height, startDisMultiplier * height)
        var node = new Node(p5.createVector(x, y), p5.random(1, 5))
        nodes.push(node);
      }
      closeNode = nodes[0]
      for (let n = 0; n < noConn; n++) {
        nodeCon.push([
          p5.round(p5.random(noNodes - 1)),
          p5.round(p5.random(noNodes - 1)),
          p5.random(100, 300)
        ]);
      }
      nodeCon.push([0, 1, 200]);

      let connected = new Set()
      nodeCon.forEach(conn => {
        connected.add(conn[0])
        connected.add(conn[1])
      })

      for (let n = 0; n < noNodes; n++) {
        if (!connected.has(n)) {
          nodeCon.push([
            n,
            p5.round(p5.random(noNodes - 1)),
            p5.random(100, 300)
          ]
          )
        }
      }
    };

    p5.draw = () => {
      p5.translate(offsetX, offsetY);
      p5.scale(zoom);
      p5.background(255);

      nodeCon.forEach(con => {
        let node1 = nodes[con[0]]
        let node2 = nodes[con[1]]
        p5.line(node1.pos.x, node1.pos.y,
          node2.pos.x, node2.pos.y)
      })
      applyForces(nodes)
      nodes.forEach(node => {
        node.draw()
        if (physics) {
          node.update()
        }
      })

    };

    function applyForces(nodes) {
      // apply force towards centre
      nodes.forEach(node => {
        let gravity = node.pos.copy().mult(-1).mult(gravityConstant)
        node.force = gravity
      });
      // apply repulsive force between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          let pos = nodes[i].pos
          let dir = nodes[j].pos.copy().sub(pos)
          let force = dir.div(dir.mag() * dir.mag())
          force.mult(forceConstant)
          nodes[i].force.add(force.copy().mult(-1))
          nodes[j].force.add(force)
        }
      }
      // apply forces applied by connections
      nodeCon.forEach(con => {
        let node1 = nodes[con[0]]
        let node2 = nodes[con[1]]
        let maxDis = con[2]
        let dis = node1.pos.copy().sub(node2.pos)
        let diff = dis.mag() - maxDis
        node1.force.sub(dis)
        node2.force.add(dis)
      })
    }

    function Node(pos, size) {
      this.pos = pos
      this.c = p5.random(0, 10)
      this.force = p5.createVector(0, 0)
      this.mass = (2 * 3.142 * size) / 1.5
      this.fs = []
    }
    Node.prototype.update = function () {
      let force = this.force.copy()
      let vel = force.copy().div(this.mass)
      // print("VEL", vel, "FORCE", force)
      this.pos.add(vel)
    }
    Node.prototype.draw = function () {
      if (this.c < 5) {
        p5.fill(255, 0, 0, 170); // Set color to red for nodes on the left side
      } else {
        p5.fill(0, 255, 0, 170); // Set color to green for nodes on the right side
      }
      p5.ellipse(this.pos.x, this.pos.y, this.mass, this.mass)
    }


    p5.mousePressed = () => {
      let mousePos = p5.createVector(p5.mouseX - width / 2 - offsetX, p5.mouseY - height / 2 - offsetY);
      clicked = true;
      lerpValue = 0.2;
      lastMouseX = p5.mouseX;
      lastMouseY = p5.mouseY;
    }
    p5.mouseDragged = () => {
      if (clicked) {
        let mousePos = p5.createVector(p5.mouseX - width / 2 - offsetX, p5.mouseY - height / 2 - offsetY);
        if (lerpValue < 0.95) {
          lerpValue += 0.02;
        }
        offsetX += p5.mouseX - lastMouseX;
        offsetY += p5.mouseY - lastMouseY;
        lastMouseX = p5.mouseX;
        lastMouseY = p5.mouseY;
      }
    }
    p5.mouseReleased = () => {
      clicked = false;
    }


  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />

      </SimpleGrid>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* <img src={graph} alt="My Image" /> */}
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </Box>
  );
}
