<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{ mode: 'stages' | 'processes' | 'app' | 'trace' }>()

const stages = [
  { name: 'Boot ROM', label: '芯片启动代码', domain: '硬件引导', action: 'CPU 上电后执行 Boot ROM，加载第一阶段引导程序。', output: '把控制权交给 Bootloader', focus: '这是芯片提供的启动入口，尚未进入 Android 用户空间。' },
  { name: 'Bootloader', label: '加载操作系统', domain: '硬件引导', action: '初始化必要硬件与内存，验证启动镜像，加载内核及启动所需数据。', output: '跳转到内核入口', focus: '设备可能包含多级 Bootloader，具体流程由芯片和产品决定。' },
  { name: 'Kernel', label: '建立内核能力', domain: 'Linux 内核', action: '初始化内存管理、调度和驱动等，准备运行用户空间。', output: '启动 init（PID 1）', focus: '内核建立进程运行的基础，后续驱动和服务仍可能继续初始化。' },
  { name: 'init', label: '启动用户空间', domain: 'Android 用户空间', action: '执行分阶段初始化，解析 rc 配置、挂载文件系统、处理属性和启动服务。', output: '启动原生服务与 Zygote', focus: '多条服务链路可以并行；图中的顺序表示主线依赖，不代表所有服务串行启动。' },
  { name: 'Zygote', label: '准备进程模板', domain: 'Android Runtime', action: 'app_process 初始化 ART 后进入 ZygoteInit；预加载常用类和资源，并 fork system_server。', output: '创建 system_server，等待应用进程请求', focus: 'ART 是进程内的运行时；Zygote 不会预加载所有 Java 类或所有应用代码。' },
  { name: 'System Server', label: '启动系统服务', domain: 'Android Framework', action: '进入 SystemServer.main()，分批启动服务，并在启动阶段推进就绪通知。', output: '系统具备启动 Home Activity 的条件', focus: 'AMS、ATMS、PMS、WMS 等属于 system_server 内部服务，不是这一主线上的独立进程。' },
  { name: 'Launcher', label: '显示桌面', domain: '应用层', action: '系统解析 Home Intent（ACTION_MAIN + CATEGORY_HOME），启动桌面应用并完成界面绘制。', output: '桌面可见，用户可以开始交互', focus: 'Launcher 本身也是应用；桌面首帧、可交互和开机完成是不同观察点。' }
]
const selected = ref(0)
const current = computed(() => stages[selected.value])
const appSteps = [
  { actor: 'Launcher', title: '点击图标', text: '发起 startActivity()，请求启动目标 Activity。', channel: 'Binder → system_server' },
  { actor: 'system_server', title: '处理启动请求', text: 'ATMS 处理 Activity、权限与任务；AMS 侧按需安排应用进程启动。', channel: '进程已存在 → 复用；进程不存在 → 请求创建' },
  { actor: 'Zygote', title: '准备应用进程', text: '常规路径通过 Unix socket 接收请求，fork 并设置应用身份。启用 USAP 时也可使用预创建进程池。', channel: '子进程进入应用运行流程' },
  { actor: 'App', title: '初始化应用', text: '进入 ActivityThread.main()，建立主线程消息循环，attach 到系统；随后进行应用绑定与初始化。', channel: '系统通过 Binder 调度应用生命周期' },
  { actor: 'App', title: '绘制首帧', text: '执行 Activity 生命周期，创建窗口和 View，完成布局与绘制，最终呈现画面。', channel: 'fork 完成 ≠ 应用首帧完成' }
]
</script>

<template>
  <div class="boot-figure">
    <template v-if="mode === 'stages'">
      <div class="figure-caption"><span>01 / 启动主线</span><span>点击阶段查看职责</span></div>
      <ol class="stage-strip" aria-label="开机阶段">
        <li v-for="(stage, index) in stages" :key="stage.name">
          <button :class="{ chosen: selected === index }" :aria-pressed="selected === index" @click="selected = index">
            <span class="stage-number">0{{ index + 1 }}</span>
            <strong>{{ stage.name }}</strong>
            <small>{{ stage.label }}</small>
          </button>
        </li>
      </ol>
      <div class="stage-detail" aria-live="polite">
        <div class="detail-title"><strong>{{ current.name }}</strong><span>{{ current.domain }}</span></div>
        <div class="detail-grid"><div><small>这个阶段做什么</small><p>{{ current.action }}</p></div><div><small>交给下一阶段</small><p>{{ current.output }}</p></div></div>
        <p class="figure-note">{{ current.focus }}</p>
      </div>
      <div class="stage-controls"><button :disabled="selected === 0" @click="selected--">← 上一阶段</button><span>{{ selected + 1 }} / {{ stages.length }}</span><button :disabled="selected === stages.length - 1" @click="selected++">下一阶段 →</button></div>
      <p class="figure-note">逻辑顺序示意，无时间比例。服务初始化存在并行与设备差异。</p>
    </template>

    <template v-else-if="mode === 'processes'">
      <div class="figure-caption"><span>02 / 进程与服务</span><span>外框是进程，内框是服务</span></div>
      <div class="process-root"><strong>init</strong><span>PID 1 · 管理服务生命周期</span></div>
      <div class="process-branches">
        <div class="process-branch"><div class="branch-label">启动原生服务</div><div class="process-box"><strong>原生服务进程</strong><p>servicemanager · vold · SurfaceFlinger 等</p><small>具体服务由 rc 配置决定</small></div></div>
        <div class="process-branch"><div class="branch-label">启动 app_process</div><div class="process-box accent"><strong>Zygote</strong><p>ART 初始化 → ZygoteInit.main()</p><small>预加载 + 等待进程创建请求</small></div>
          <div class="fork-branches">
            <div><div class="branch-label">fork system_server</div><div class="process-box"><strong>system_server</strong><div class="service-grid"><span>AMS<small>进程管理</small></span><span>ATMS<small>Activity / 任务</small></span><span>PMS<small>包管理</small></span><span>WMS<small>窗口管理</small></span></div><small>SystemServer 分批启动这些服务</small></div></div>
            <div><div class="branch-label">按需创建 / 进程池</div><div class="process-box"><strong>应用进程</strong><p>Launcher · SystemUI · 普通应用等</p><small>这里画的是进程来源；启动请求来自系统服务</small></div></div>
          </div>
        </div>
      </div>
      <p class="figure-note">简化单个主 Zygote 的关系。部分设备还有第二个 Zygote 或专用 Zygote；ART 不作为独立进程绘制。</p>
      <div class="service-phases"><span>Bootstrap<small>基础服务</small></span><b>→</b><span>Core<small>核心服务</small></span><b>→</b><span>Other<small>其他服务</small></span><b>→</b><span>APEX<small>模块相关服务</small></span></div>
      <p class="figure-note">SystemServer 的服务启动批次示意；具体内容和异步任务以对应版本源码为准。</p>
    </template>

    <template v-else-if="mode === 'app'">
      <div class="figure-caption"><span>03 / 桌面之后</span><span>应用进程不存在时的典型路径</span></div>
      <ol class="app-sequence"><li v-for="(step, index) in appSteps" :key="step.title"><div class="actor"><span>0{{ index + 1 }}</span><strong>{{ step.actor }}</strong></div><div class="sequence-content"><strong>{{ step.title }}</strong><p>{{ step.text }}</p><small>↓ {{ step.channel }}</small></div></li></ol>
      <div class="boundary"><strong>两个不同的动作</strong><span>开机启动桌面：Home Intent → Launcher</span><span>点击桌面图标：Launcher → 目标应用 Activity</span></div>
    </template>

    <template v-else>
      <div class="figure-caption"><span>04 / 性能观察</span><span>抓开机 Trace 的覆盖边界</span></div>
      <div class="coverage-grid"><div v-for="(stage, index) in stages" :key="stage.name" :class="{ unavailable: index < 4, partial: index === 4, available: index > 4 }"><strong>{{ stage.name }}</strong><span>{{ index < 3 ? '不覆盖' : index === 3 ? '前半段不覆盖' : index === 4 ? '可能部分覆盖' : '就绪后可观察' }}</span></div></div>
      <div class="trace-gate"><span>/data 已挂载</span><b>+</b><span>持久化属性已加载</span><b>+</b><span>traced 已就绪</span><b>→</b><strong>开始录制</strong></div>
      <p class="figure-note">仅指本文关联教程中的 Perfetto 开机服务录制方式。实际起点由设备决定，system_server 也可能已有部分工作完成。</p>
      <div class="milestones"><div><strong>桌面首帧</strong><p>画面开始呈现</p></div><b>≠</b><div><strong>桌面可交互</strong><p>输入能及时响应</p></div><b>≠</b><div><strong>系统开机完成</strong><p>属性 / 广播等里程碑</p></div></div>
      <p class="figure-note">这些指标没有在此图中规定固定先后顺序。分析前先明确“开机完成”采用哪个指标。</p>
    </template>
  </div>
</template>

<style scoped>
.boot-figure{margin:18px 0 24px;border:1px solid var(--vp-c-divider);border-radius:8px;padding:18px;background:var(--vp-c-bg);font-size:13px;line-height:1.65}
.figure-caption{display:flex;justify-content:space-between;gap:12px;margin-bottom:16px;color:var(--vp-c-text-2);font-size:11px}.figure-caption span:first-child{color:var(--vp-c-brand-1);font-weight:600}
.boot-figure p{font-size:13px;margin:6px 0;line-height:1.7}.boot-figure small{font-size:11px;color:var(--vp-c-text-2)}
.boot-figure .figure-note{font-size:12px;color:var(--vp-c-text-2);margin:14px 0 0}.stage-strip{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:12px;padding:0!important;margin:0!important;list-style:none!important}.stage-strip li{position:relative;margin:0!important}.stage-strip li:not(:last-child)::after{content:'→';position:absolute;right:-11px;top:40px;color:var(--vp-c-text-3);font-size:12px}.stage-strip button{display:flex;flex-direction:column;align-items:flex-start;gap:4px;border:1px solid var(--vp-c-divider);border-radius:5px;padding:9px 7px;min-height:111px;width:100%;text-align:left;background:var(--vp-c-bg-soft);cursor:pointer}.stage-strip button.chosen{border-color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft)}.stage-number{color:var(--vp-c-brand-1);font-size:10px}.stage-strip strong{font-size:12px;line-height:1.4}.stage-strip small{font-size:10px}.stage-detail{margin-top:16px;border-top:1px solid var(--vp-c-divider);padding-top:14px;min-height:190px}.detail-title{display:flex;justify-content:space-between;gap:10px}.detail-title>strong{font-size:17px}.detail-title>span{font-size:11px;color:var(--vp-c-text-2)}.detail-grid{display:grid;grid-template-columns:3fr 2fr;gap:24px;margin-top:12px}.stage-controls{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:11px;color:var(--vp-c-text-2)}.stage-controls button{padding:5px 10px;border:1px solid var(--vp-c-divider);border-radius:4px;font-size:12px;cursor:pointer}.stage-controls button:disabled{opacity:.4;cursor:default}button:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}
.process-root{padding:12px 16px;border:1px solid var(--vp-c-brand-1);border-radius:5px;background:var(--vp-c-brand-soft);display:flex;justify-content:space-between}.process-root span{font-size:12px;color:var(--vp-c-text-2)}.process-branches{display:grid;grid-template-columns:1fr 2fr;gap:20px}.branch-label{padding:10px 0;font-size:11px;text-align:center;color:var(--vp-c-text-2)}.branch-label::before{content:'↓ ';color:var(--vp-c-brand-1)}.process-box{padding:13px;border:1px solid var(--vp-c-divider);border-radius:5px;background:var(--vp-c-bg-soft)}.process-box>strong{display:block;font-size:14px}.process-box.accent{border-color:var(--vp-c-brand-1)}.fork-branches{display:grid;grid-template-columns:1fr 1fr;gap:12px}.service-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}.service-grid>span{background:var(--vp-c-bg);padding:5px 7px;border:1px solid var(--vp-c-divider);border-radius:3px;font-size:12px}.service-grid small{display:block;font-size:10px}.service-phases{display:flex;justify-content:space-between;align-items:center;gap:6px;margin-top:18px;border-top:1px solid var(--vp-c-divider);padding-top:16px}.service-phases>span{text-align:center;flex:1;font-size:12px}.service-phases small{display:block}.service-phases b{color:var(--vp-c-text-3);font-weight:400}
.app-sequence{list-style:none!important;padding:0!important;margin:0!important}.app-sequence li{display:grid;grid-template-columns:110px 1fr;gap:18px;padding:14px 0;margin:0!important;border-bottom:1px solid var(--vp-c-divider)}.app-sequence li:first-child{padding-top:0}.actor{display:flex;flex-direction:column;gap:5px}.actor>span{font-size:10px;color:var(--vp-c-brand-1)}.actor>strong{font-size:12px;color:var(--vp-c-brand-1)}.sequence-content>strong{font-size:14px}.sequence-content small{display:block;margin-top:8px}.boundary{display:grid;gap:6px;padding:12px 14px;margin-top:16px;border-radius:5px;background:var(--vp-c-brand-soft);font-size:12px}.boundary>strong{color:var(--vp-c-brand-1)}
.coverage-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px}.coverage-grid>div{border:1px solid var(--vp-c-divider);padding:10px 6px;border-radius:4px;min-height:89px}.coverage-grid strong{font-size:11px;display:block;line-height:1.4}.coverage-grid span{font-size:10px;display:block;margin-top:9px;color:var(--vp-c-text-2)}.coverage-grid .unavailable{background:var(--vp-c-bg-soft)}.coverage-grid .partial{border-style:dashed;border-color:var(--vp-c-brand-1)}.coverage-grid .available{background:var(--vp-c-brand-soft);border-color:var(--vp-c-brand-1)}.trace-gate{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:18px;font-size:11px}.trace-gate b{font-weight:400;color:var(--vp-c-text-3)}.trace-gate strong{color:var(--vp-c-brand-1)}.milestones{display:flex;align-items:center;justify-content:space-between;gap:14px;border-top:1px solid var(--vp-c-divider);padding-top:16px;margin-top:20px}.milestones>div{flex:1;text-align:center}.milestones strong{font-size:13px}.milestones p{font-size:11px;color:var(--vp-c-text-2)}.milestones>b{color:var(--vp-c-brand-1);font-size:22px;font-weight:400}
</style>
