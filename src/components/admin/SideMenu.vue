<template>
    <el-row class="categories">
        <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="white"
                    text-color="black"
                    active-text-color="#409EFF">
                <el-menu-item index="0" @click="indexSelect('0')">
                    <i class="el-icon-s-grid"></i>
                    <span slot="title">全部</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-watermelon"></i>
                        <span>教材</span>
                    </template>
                    <el-menu-item index="1-1" @click="indexSelect('1-1')">基础学科</el-menu-item>
                    <el-submenu index="1-2">
                        <template slot="title">专业课</template>
                        <el-cascader
                                v-model="value"
                                :options="options"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleChange">
                        </el-cascader>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-grape"></i>
                        <span>小说</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="indexSelect('2-1')">名著</el-menu-item>
                        <el-menu-item index="2-2" @click="indexSelect('2-2')">课外读物</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-grape"></i>
                        <span>考研资料</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1" @click="indexSelect('3-1')" >数学</el-menu-item>
                        <el-menu-item index="3-2" @click="indexSelect('3-2')">英语</el-menu-item>
                        <el-menu-item index="3-3" @click="indexSelect('3-3')">政治</el-menu-item>
                        <el-submenu index="3-4">
                            <template slot="title">专业课</template>
                            <el-cascader
                                    v-model="value"
                                    :options="MBAoptions"
                                    :props="{ expandTrigger: 'hover' }"
                                    @change="handleChange">
                            </el-cascader>
                        </el-submenu>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4" @click="indexSelect('4')">
                    <i class="el-icon-orange"></i>
                    <span slot="title">计算机资料</span>
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-grape"></i>
                        <span>英语</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1" @click="indexSelect('5-1')" >四级</el-menu-item>
                        <el-menu-item index="5-2" @click="indexSelect('5-2')">六级</el-menu-item>
                        <el-menu-item index="5-3" @click="indexSelect('5-3')">读物</el-menu-item>
                        <el-menu-item index="5-4" @click="indexSelect('5-4')">其他</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="6" @click="indexSelect('6')">
                    <i class="el-icon-orange"></i>
                    <span slot="title">励志类</span>
                </el-menu-item>
                <el-menu-item index="7" @click="indexSelect('7')">
                    <i class="el-icon-orange"></i>
                    <span slot="title">心理学</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'SideMenu',
        data() {
            return {
                value: [],
                options: [
                    {
                    value: '1-2-1',
                    label: '工学',
                    children: [
                        {
                            value: '1-2-1-1',
                            label: '环安',
                        },
                        {
                            value: '1-2-1-2',
                            label: '机械',
                        },
                        {
                            value: '1-2-1-3',
                            label: '农机',
                        },
                        {
                            value: '1-2-1-4',
                            label: '能动',
                        },
                        {
                            value: '1-2-1-5',
                            label: '材料',
                        }, {
                            value: '1-2-1-6',
                            label: '食品',
                        }
                        , {
                            value: '1-2-1-7',
                            label: '电气',
                        }
                        , {
                            value: '1-2-1-8',
                            label: '车辆',
                        },
                        {
                            value: '1-2-1-9',
                            label: '计算机',
                        },
                        {
                            value: '1-2-1-10',
                            label: '化工',
                        }
                    ]
                },
                    {
                        value: '1-2-2',
                        label: '理学',
                    },
                    {
                        value: '1-2-3',
                        label: '文学',
                        children:[
                            {
                                value: '1-2-3-1',
                                label: '文学',
                            },
                            {
                                value: '1-2-3-2',
                                label: '法学',
                            },
                            {
                                value:'1-2-3-3',
                                label:'外国语'
                            },
                            {
                                value:'1-2-3-4',
                                label:'马克思'
                            }
                        ]
                    },
                    {
                        value: '1-2-4',
                        label: '教育学',
                    },
                    {
                        value: '1-2-5',
                        label: '经济学',
                    },
                    {
                        value: '1-2-6',
                        label: '艺术学',
                    },
                    {
                        value: '1-2-7',
                        label: '管理学',
                    },
                    {
                        value: '1-2-8',
                        label: '医学',
                    }
                ],
                MBAoptions:  [
                    {
                    value: '3-4-1',
                    label: '工学',
                    children: [
                        {
                            value: '3-4-1-1',
                            label: '环安',
                        },
                        {
                            value: '3-4-1-2',
                            label: '机械',
                        },
                        {
                            value: '3-4-1-3',
                            label: '农机',
                        },
                        {
                            value: '3-4-1-4',
                            label: '能动',
                        },
                        {
                            value: '3-4-1-5',
                            label: '材料',
                        }, {
                            value: '3-4-1-6',
                            label: '食品',
                        }
                        , {
                            value: '3-4-1-7',
                            label: '电气',
                        }
                        , {
                            value: '3-4-1-8',
                            label: '车辆',
                        },
                        {
                            value: '3-4-1-9',
                            label: '计算机',
                        },
                        {
                            value: '3-4-1-10',
                            label: '化工',
                        },
                    ]
                },
                    {
                        value: '3-4-2',
                        label: '理学',
                    },
                    {
                        value: '3-4-3',
                        label: '文学',
                        children:[
                            {
                                value: '3-4-3-1',
                                label: '文学',
                            },
                            {
                                value: '3-4-3-2',
                                label: '法学',
                            },
                            {
                                value:'3-4-3-3',
                                label:'外国语'
                            },
                            {
                                value:'3-4-3-4',
                                label:'马克思'
                            }
                        ]
                    },
                    {
                        value: '3-4-4',
                        label: '教育学',
                    },
                    {
                        value: '3-4-5',
                        label: '经济学',
                    },
                    {
                        value: '3-4-6',
                        label: '艺术学',
                    },
                    {
                        value: '3-4-7',
                        label: '管理学',
                    },
                    {
                        value: '3-4-8',
                        label: '医学',
                    }
                ],
            };
        },
        methods: {
            handleChange(value) {
                this.indexSelect(value[value.length-1]);
            },
            indexSelect(index){
                this.$emit('indexSelect',index);
            }
        }

    }
</script>

<style scoped>
    .el-col-12 {
        width: 100%;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

    .categories {
        text-align: left;
        position: absolute;
        margin-left: 50%;
        left: -600px;
        top: 100px;
        width: 150px;
    }

</style>
