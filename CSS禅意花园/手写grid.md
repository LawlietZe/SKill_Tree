 
 ## prepare knowleage
 @include(args, args)
 @mixin(var1, var2)
 #{}
 
 $map: (key1: value1, key2: value2, key3: value3);

 * Breakpoint: es， extremely small screen ,320px
 *             sm,  Small screen: Tablet , 768px
 *             md,  Medium screen: Desktop , 960px
 *             lg,  lg screen: Desktop with high-res , 1200px

The map-get function looks up values in a map and the map-merge function adds values to a map.

## debuild a girid system
``` scss
 //---- gird.scss
 
 //define the const 
 $max-col-count: 12;  
 $brk-types: 'es', 'sm', 'md', 'lg'
 $screen-es-width: 320px;
 $screen-sm-width: 768px;
 $screen-md-width: 960px;
 $screen-lg-width: 1200px;
 
 $screen-res: (es: $screen-es-width, sm: $screen-sm-width, md: $screen-md-width, lg: $screen-lg-width);
 
 @mixin create-grid($brk-type, $col-gutter){
    @media only screen and (min-width: map-get($screen-res, $brk-type)){
      .pack{
          width: map-get($screen-res, $brk-type);
          max-width: none;
          margin: 0 auto;
          background-color: transparent;
      }
      @for $i from 1 through $max-col-count{
        .col-#{$brk-type}-#{$i}{
          position: relative;
          float: left;
          box-sizing: border-box;
          width: percentage( $i/ $max-col-count)
          padding-left: $col-gutter * .5
          padding-right: $col-gutter * .5
        }
      }
      .view-#{$brk-type}-hide {
        display: none !important;
      }
      .view-#{$brk-type}-show {
        display: inherit !important;
      }
      @for $i from 1 through $max-col-count {
        .col-#{$brk-type}-offset-#{$i} {
          margin-left: percentage($i / $max-col-count);
        }
      }
    }
 }
 
 @mixin create-grids($rootzCls, $your-col-gutter){
  #{$rootCls} {
    .pack {
      position: relative;
      max-width: none;
      min-width: none;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      box-sizing: border-box;
      font-size: 14px;
      background-color: transparent;
      height: 100%;
      @include clearfix();
      & > .row {
        margin-right: -15px;
        margin-left: -15px;
      }
    }

    .row {
      box-sizing: border-box;
      // margin: 0;
      height: 100%;
      @include clearfix();
    }

    .child-grid {
      &div[class^="col-"] {
        background-color: transparent;
      }
      border: 1px solid #999;
    }
    @each $bt in $brk-types {
      @include create-grid($bt, $your-col-gutter);
    }
}

```
