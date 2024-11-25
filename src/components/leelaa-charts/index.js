import ChartsView from './ChartsView.vue'
import XAxisView from './XAxisView.vue'
import YAxisView from './YAxisView.vue'
import GridView from './GridView.vue'
import TooltipView from './TooltipView.vue'
import LegendView from './LegendView.vue'
import BarView from './BarView.vue'
import LineView from './LineView.vue'

export {
  ChartsView,
  XAxisView,
  YAxisView,
  GridView,
  TooltipView,
  LegendView,
  BarView,
  LineView
}

export default {
  install(app) {
    app.component('ChartsView', ChartsView)
    app.component('XAxisView', XAxisView)
    app.component('YAxisView', YAxisView)
    app.component('GridView', GridView)
    app.component('TooltipView', TooltipView)
    app.component('LegendView', LegendView)
    app.component('BarView', BarView)
    app.component('LineView', LineView)
  }
}
