import Base from 'magnet-core/dist/base';
import views from '../index.js';
import convert from 'koa-convert';
import path from 'path';
import co from 'co';

export default class Views extends Base {
  async setup() {
    let config = Object.assign({}, this.config.view);

    const folderPath = path.resolve(
      process.cwd(),
      config.viewPath || 'server/views'
    );

    this.app.application.use(
      convert(
        views(process.cwd(), config)
      )
    );

    this.app.application.use(async (ctx, next) => {
      ctx.render = co.wrap(ctx.render.bind(ctx));
      console.log('in render wrap');
      await next();
    });
  }
}
