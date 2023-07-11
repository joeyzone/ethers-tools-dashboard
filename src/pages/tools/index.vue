<template>
  <div class="page-tool">
    <div class="tool-block">
      <el-form :model="formBytes" label-width="120px">
        <el-form-item label="String">
          <el-input
            v-model="formBytes.str"
            @input="strChange"
            @change="strChange"
          />
        </el-form-item>
        <el-form-item label="">
          <el-icon class="icon-sort"><Sort /></el-icon>
        </el-form-item>
        <el-form-item label="Bytes32">
          <el-input
            v-model="formBytes.bytes"
            @input="byteChange"
            @change="byteChange"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="tool-block">
      <el-form :model="formABI" label-width="120px">
        <el-form-item>
          <el-input :rows="6" type="textarea" v-model="formABI.strArray" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="createSig"
            >Create Func Sig</el-button
          >
        </el-form-item>
        <el-form-item label="Function Name">
          <el-input v-model="formABI.functionName" />
        </el-form-item>
        <el-form-item label="Function Sig">
          <b class="b-text">{{ formABI.functionSig }}</b>
        </el-form-item>
        <el-form-item label="Function Args">
          <el-input v-model="formABI.args" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="createABI">Create ABI</el-button>
        </el-form-item>
        <el-form-item label="ABI Calldata">
          <el-input
            :rows="6"
            type="textarea"
            disabled
            v-model="formABI.calldata"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ethers } from "ethers";
import { Interface } from "ethers";
import { Sort } from "@element-plus/icons-vue";

const formBytes = reactive({
  str: "aaa",
  bytes: ethers.encodeBytes32String("aaa"),
});

const strChange = (val: string) => {
  const bytes = ethers.encodeBytes32String(val);
  formBytes.bytes = bytes;
};
const byteChange = (val: string) => {
  const bytes = ethers.decodeBytes32String(val);
  formBytes.str = bytes;
};

const formABI = reactive({
  strArray:
    "constructor(string symbol, string name) &&\nfunction transferFrom(address from, address to, uint amount)&&\nfunction mint(uint amount) payable",
  jsonData: "",
  functionName: "transferFrom",
  functionSig: "",
  args: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045,0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045,20",
  calldata: "",
});

let funArr;
let iface: Interface;

const createSig = async () => {
  funArr = await formABI.strArray
    .replace(/\n/g, "")
    .replace(/\s+ &&/g, "&&")
    .replace(/&& \s+/g, "&&")
    .split("&&");
  iface = await new ethers.Interface(funArr);

  formABI.functionSig = iface.getFunction(formABI.functionName)?.selector || "";
};

const createABI = async () => {
  if (!formABI.functionSig) {
    await createSig();
  }
  const data = formABI.args.split(",");

  formABI.calldata = iface.encodeFunctionData(formABI.functionName, data);
};
</script>

<style lang="less">
.page-tool {
  padding: 60px 0;
  .tool-block {
    max-width: 560px;
    margin: 0 auto 60px;
    padding: 20px;
    border: 1px solid #e8e8e8;
    .icon-sort {
      width: 100%;
      color: #147106;
      font-weight: 600;
      font-size: 20px;
    }
    .b-text {
      color: coral;
      max-width: 100%;
      overflow-wrap: wrap;
    }
  }
}
</style>
