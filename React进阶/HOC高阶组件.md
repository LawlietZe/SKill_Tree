## 高阶组件
[React高阶组件(HOC)模型理论与实践](https://segmentfault.com/a/1190000008112017?_ea=1553893)

### 什么是HOC 高阶组件

HOC(全称Higher-order component)是一种React的进阶使用方法，主要还是为了便于组件的复用。HOC就是一个方法，获取一个组件，返回一个更高级的组件。

### 使用场景

在React开发过程中，发现有很多情况下，组件需要被"增强"，比如说给组件添加或者修改一些特定的props，一些权限的管理，或者一些其他的优化之类的。而如果这个功能是针对多个组件的，同时每一个组件都写一套相同的代码，明显显得不是很明智，所以就可以考虑使用HOC。

### 简单实现

HOC不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。


```javascript
function HOCFactory(WrappedComponent){
  return HOC extends React.component{
    render(){
      return <WrapperComponent {...this.props} />
    }
  }
}

```

### HOC可以做什么
1. 代码复用（替代mixin）
2. 增删改props
3. 渲染劫持 
劫持，由于传入的wrappedComponent是作为一个child进行渲染的，上级传入的props都是直接传给HOC的，所以HOC组件拥有很大的权限去修改props和控制渲染。

#### 增删改props
例如要增加一个公共性props
```javascript
function HOCFactory(WrappedComponent){
  return HOC extends React.component{
    render(){
      let props = {
        ...this.props,
        message: "a common string"
      }
      <WrapperComponent {...props} />
    }
  }
}
---------- 这样在组件里就可以使用
class MyComponent extends React.Component {
  render(){
    return (<div>{this.props.message}</div>)
  }
}
export default control(MyComponent)
```

#### 渲染劫持
这里的渲染劫持并不是你能控制它渲染的细节，而是控制是否去渲染。由于细节属于组件内部的render方法控制，所以你无法控制渲染细节。

比如，组件要在data没有加载完的时候，现实loading...，就可以这么写：这个样子，在父级没有传入data的时候，这一块儿就只会显示loading...,不会显示组件的具体内容

```javascript
  function loading(WrappedComponent){
    return class Loading extends React.Component{
      render(){
        if(!this.props.data){
          return <div>loading</div>
        }
        return <WrappedComponent {...props} />
      }
    }
  }
```
#### 页面权限管理
可以通过HOC对组件进行包裹，当跳转到当前页面的时候，检查用户是否含有对应的权限。如果有的话，渲染页面。如果没有的话，跳转到其他页面(比如无权限页面，或者登陆页面)。

### HOC 注意事项
#### 不要随意修改props

#### Ref无法获取想要的ref

#### Component上绑定的static方法丢失 

比如，你原来在Component上面绑定了一些static方法MyComponent.staticMethod = o=>o。但是由于经过HOC的包裹，父级组件拿到的已经不是原来的组件了，所以当然无法获取到staticMethod方法了。  
这里有一个解决方法，就是hoist-non-react-statics组件，这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上：
```javascript
  import hoistNonReactStatic from 'hoist-non-react-statics';
  function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
  }
```

### 一个HOC 表单方案
```javascript
/**
 * @file CreateForm
 *
 * @description
 *
 * @author daniel.zhu (daniel.zhu@thenetcircle.com)
 * @date 2017-6-7
 */
import React, { PureComponent, cloneElement } from 'react'
import _ from 'lodash'
// oist-non-react-statics组件，这个组件会自动把所有绑定在对象上的非React方法都绑定到新的对象上：
import hoistStatics from 'hoist-non-react-statics'
// 一个context组件，方便子组件调用form方法，改变filed值
import FormContext from './formContext'
import createFieldsStatus, { cloneFieldStatus } from './fieldStatus'
import { isNullObj } from 'shared/util/sinkUtil'
import i18nClient from 'helpers/i18n-client'

let Form
let CreateForm = {}

const initForm = (options) => {
  const {
    // 获取从外部传递过来的方法
    mapPropsToFields,
    onFieldsChange
  } = options
  // 工厂模式 制造高阶组件,返回一个函数
  function factory (PassedComponent) {
    Form = class extends PureComponent {
      constructor (props) {
        super(props)
        // 收集props中是函数的
        let propsFunctions = {}
        // 是来自warpper的props,这里是一个高阶组件
        Object.keys(props).map(attrKey => {
          if (typeof props[attrKey] === 'function') {
            propsFunctions[attrKey] = props[attrKey]
          }
        })
        // (mapPropsToFields && mapPropsToFields(_.omit(props, Object.keys(propsFunctions)))) 这一部是剔除props中的函数, 传递给createFieldsStatus 实例化方法 , 并没有 meta
        // 把wrapper 的值相关的props 往下传递给 form
        // 在这里 fileds 包括了 之前wrapper传入的props 以及一系列操作 其中 props的方法， 把props完全包裹在一个叫做fileds 的对象里
        const fields = createFieldsStatus((mapPropsToFields && mapPropsToFields(_.omit(props, Object.keys(propsFunctions)))) || {})
        this.state = {
          ...propsFunctions,
          fieldsStatus: fields,
          instances: {},
          cachedBind: {},
          submitting: false,
          // 在这里把fileds中的操作挂在到form对象里, 方便子对象直接调用改编filed的方法， 本身改变filed的方法在本实例中 也会用一次
          form: {
            getFieldValue: this.getFieldValue, // retreive field value by field name
            getFieldsValue: this.getFieldsValue, // get values by field IDs, if no name provided, will return value of all fields
            getFieldValueDeeper: this.getFieldValueDeeper, // retreive field deep value by field name
            getFieldsValueDeeper: this.getFieldsValueDeeper, // get deep values by field IDs, if no name provided, will return value of all fields

            getFieldProps: this.getFieldProps,
            removeFieldProps: this.removeFieldProps,

            // get the error of a field, fieldId
            getFieldError: this.getFieldError,

            // get specified fields' errors, if no fieldId provided, it will give out all the errors of fields
            getFieldsError: this.getFieldsError,

            isFieldValidating: this.isFieldValidating,
            isFieldsValidating: this.isFieldsValidating,

            // detect whether the field is touched at that moment by fieldId
            isFieldTouched: this.isFieldTouched,

            // check are there any fields is touched at that moment
            isFieldsTouched: this.isFieldsTouched,

            setFieldValue: this.setFieldValue,
            // Set the whole new fields to fieldsStatus object
            setFieldsValue: this.setFieldsValue,
            // validate fields, and give out the value and errors, if no field specified, will validate all the fileds
            validateField: this.validateField,
            validateFields: this.validateFields,
            // reset the whole fields
            resetFields: this.resetFields,
            resetFieldsError: this.resetFieldsError,
            submit: this.submit,
            isSubmitting: this.isSubmitting,

            // Two-way binding method for Form
            //
            // | property name             | description                                                         |      type       | default value |
            // | :------------------------ | :------------------------------------------------------------------ | :-------------: | :-----------: |
            // | name                      | The unique key for element                                          |     string      |               |
            // | options.rules             | validation rules, refer to detail table of Validation               |     object      |      {}       |
            // | options.trigger           | the time to collect the data of children node                       |     string      |   onChange    |
            // | options.validateTrigger   | the time to validate the data of children node                      | array([string]) |   onChange    |
            // | options.initialValue      | unknown                                                             |                 |               |
            // | options.valuePropName     | the key prop of children node, the prop of Switching is 'xxx'       |     string      |     value     |
            // | options.getValueFromEvent | convert the parameters come from onChange                           |      func       |               |
            // |                           |                                                                     |                 |               |
            //
            // ### Validation Rules
            // | property name | description                                          | type                        | default value |
            // | ------------- | ---------------------------------------------------- | --------------------------- | ------------- |
            // | tip           | validation error message                             | string                      |               |
            // | type          | existing validation type provided by component       | string                      | string        |
            // | required      | declare whether field is required or not             | boolean                     | false         |
            // | length        | validate certain length of a field                   | number                      | -             |
            // | min           | validate a min length of a field  >=min              | number                      | -             |
            // | max           | validate a max length of a field  <=max              | number                      | -             |
            // | enum          | validate a value come from a list of possible values | string                      | -             |
            // | pattern       | validate a value from a regular expression           | RegExp                      | -             |
            // | convertFunc   | convert a value before validation                    | func(value) => {converted}  | -             |
            // | validator     | customized validate function                         | func(rule, value, callback) | -             |
            //
            // #### Rules.type
            //
            // - `string`: Must be of type `string`. `is the default type.`
            // - `number`: Must be of type `number`.
            // - `boolean`: Must be of type `boolean`.
            // - `method`: Must be of type `function`.
            // - `regexp`: Must be an instance of `RegExp` or a string that does not generate an exception when creating a new `RegExp`.
            // - `integer`: Must be of type `number` and an integer.
            // - `float`: Must be of type `number` and a floating point number.
            // - `array`: Must be an array as determined by `Array.isArray`.
            // - `object`: Must be of type `object` and not `Array.isArray`.
            // - `enum`: Value must exist in the `enum`.
            // - `date`: Value must be valid as determined by `Date`
            // - `url`: Must be of type `url`.
            // - `hex`: Must be of type `hex`.
            // - `email`: Must be of type `email`.
            getFieldSugar: this.getFieldSugar
          }
        }
      }

      componentWillReceiveProps (nextProps) {
        if (mapPropsToFields) {
          let newFields = {...this.state.fieldsStatus.fields, ...mapPropsToFields(nextProps)}
          let newFieldsStatus = cloneFieldStatus(this.state.fieldsStatus)
          newFieldsStatus.resetFieldStatus(newFields)
          this.setState({fieldsStatus: newFieldsStatus})
        }
      }

      componentDidMount () {}

      componentWillUnmount () {}

      handleChange () {}

      getFieldInstance (name) {
        return this.state.instances[name]
      }

      collectData () {}

      collectValidated () {}

      getFieldProps = (fieldName, sugarOptions) => {
        if (!fieldName) {
          return {}
        }

        const fieldOptions = {
          validate: [],
          fieldName,
          ...sugarOptions
        }

        const { valuePropName } = fieldOptions

        // Get the current fieldMeta, and save to the latest one
        const fieldMeta = this.state.fieldsStatus.getFieldMeta(fieldName)

        const inputProps = {}

        let meta = {
          ...fieldMeta,
          ...fieldOptions
        }

        let fieldsStatus = cloneFieldStatus(this.state.fieldsStatus)

        if ('initialValue' in fieldOptions) {
          meta.initialValue = fieldOptions.initialValue
          inputProps.defaultValue = fieldOptions.initialValue

          if (fieldsStatus.fields[fieldName] === undefined || fieldsStatus.fields[fieldName] === '') {
            fieldsStatus.setField({name: fieldName, values: fieldOptions.initialValue})
          }

          if (valuePropName && (fieldsStatus.fields[fieldName][valuePropName] === undefined || fieldsStatus.fields[fieldName][valuePropName] === '')) {
            fieldsStatus.setField({name: fieldName, values: {[valuePropName]: fieldOptions.initialValue}})
          }
        }

        fieldsStatus.setFieldMeta(fieldName, meta)

        // this.setState({fieldsStatus: fieldsStatus})
        // this function triggered in getFieldSugar which always in render function, so we cannot use setState in render
        this.state.fieldsStatus = fieldsStatus

        return inputProps
      }

      removeFieldProps = (fieldName) => {
        let fieldsStatus = cloneFieldStatus(this.state.fieldsStatus).removeFieldMeta(fieldName)
        this.setState({fieldsStatus: fieldsStatus})
      }

      getFieldSugar = (fieldName, options) => {
        const props = this.getFieldProps(fieldName, options)
        const sugared = (Component, needPassDownOptions = false) => {
          if (needPassDownOptions) {
            return cloneElement(Component, {
              ...props,
              options
            })
          } else {
            return Component
          }
        }
        return sugared
      }

      setFieldValue = (name, fieldValue) => {
        let newFieldsStatus = cloneFieldStatus(this.state.fieldsStatus)
        newFieldsStatus.setField({name: name, values: fieldValue})
        // console.log(`form item changed: ${name}, ${typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue}`)
        this.setState((state, props) => {
          return {fieldsStatus: newFieldsStatus}
        }, () => {
          this.validateField(name)
          if (onFieldsChange) {
            onFieldsChange(this.props, {name: name, data: fieldValue})
          }
        })
      }

      setFieldsValue = (fields) => {
        if (fields instanceof Array) {
          let fieldsNames = []
          fields.map(item => {
            let newFieldsStatus = cloneFieldStatus(this.state.fieldsStatus)
            newFieldsStatus.setField({name: item.name, values: item.fieldValue})
            // console.log(`form item changed: ${item.name}, ${typeof item.fieldValue === 'object' ? JSON.stringify(item.fieldValue) : item.fieldValue}`)
            this.setState({fieldsStatus: newFieldsStatus}, () => {
              fieldsNames.push(item.name)
              if (onFieldsChange) {
                onFieldsChange(this.props, {name: item.name, data: item.fieldValue})
              }
            })
          })
          this.validateFields(fieldsNames)
        }
      }
      setFieldsInitialValue = () => {}

      getFieldValue = (name) => {
        return this.state.fieldsStatus.getFieldValue(name)
      }
      getFieldsValue = (names) => {
        return this.state.fieldsStatus.getFieldsValue(names)
      }
      getFieldValueDeeper = (name) => {
        return this.state.fieldsStatus.getFieldValueDeeper(name)
      }
      getFieldsValueDeeper = (names) => {
        return this.state.fieldsStatus.getFieldsValueDeeper(names)
      }
      getFieldError = (name) => {
        return this.state.fieldsStatus.getFieldError(name)
      }
      getFieldsError = (names) => {
        return this.state.fieldsStatus.getFieldsError(names)
      }
      isFieldValidating = () => {
        return this.state.fieldsStatus.isFieldValidating()
      }
      isFieldsValidating = () => {
        return this.state.fieldsStatus.isFieldsValidating()
      }
      isFieldTouched = () => {
        return this.state.fieldsStatus.isFieldTouched()
      }
      isFieldsTouched = () => {
        return this.state.fieldsStatus.isFieldsTouched()
      }
      validateField = (fieldName) => {
        let fieldsStatus = cloneFieldStatus(this.state.fieldsStatus)
        if (fieldsStatus.fieldsMeta.hasOwnProperty(fieldName)) {
          let fieldValue = fieldsStatus.fields[fieldName]
          const rules = fieldsStatus.fieldsMeta[fieldName].rules || []
          // isRequired default to false in Change gender form
          const isRequired = fieldsStatus.fieldsMeta[fieldName].isRequired === undefined ? true : fieldsStatus.fieldsMeta[fieldName].isRequired
          const valuePropName = fieldsStatus.fieldsMeta[fieldName].valuePropName
          let errorMessage = {}
          if (rules.length > 0) {
            rules.some(rule => {
              fieldValue = rule.hasOwnProperty('convertFunc') ? rule.convertFunc(fieldValue) : fieldValue
              let toComparePropValue = valuePropName ? fieldValue[valuePropName] : fieldValue
              // Add length check, the purpose is to check fields is not required, but when it's not empty, go and check it. like participants in creating event page
              let needToValidate = true
              if (!isRequired) {
                const type = typeof toComparePropValue
                switch (type) {
                  case 'undefined':
                    needToValidate = false
                    break
                  case 'object':
                    if (toComparePropValue === null) {
                      needToValidate = false
                    } else if (_.isArray(toComparePropValue)) {
                      needToValidate = toComparePropValue.length > 0
                    } else if (toComparePropValue.hasOwnProperty('active')) {
                      // for {data: [], active:[]}
                      needToValidate = toComparePropValue.active.length > 0
                    }
                    break
                  default:
                    if (_.toString(toComparePropValue).length === 0) {
                      needToValidate = false
                    }
                }
              }
              if (needToValidate) {
                switch (rule.type) {
                  case 'number':
                    if (!_.isNumber(toComparePropValue) || (typeof toComparePropValue === 'string' && toComparePropValue.length === 0)) {
                      errorMessage.message = i18nClient.t('common:form.hint.value_need_tobe_a_number')
                    } else {
                      toComparePropValue = Number(toComparePropValue)
                      // use length / min / max
                      if (rule.length && toComparePropValue !== rule.length) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.length_not_matched')
                      } else if (rule.min !== undefined && toComparePropValue < rule.min) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.less_than_rule_min')
                      } else if (rule.max !== undefined && toComparePropValue > rule.max) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.bigger_than_rule_max')
                      }
                    }
                    break
                  case 'string':
                    if (toComparePropValue === undefined) {
                      toComparePropValue = ''
                    }
                    if (typeof toComparePropValue !== 'string') {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_a_string')
                    } else {
                      // use length / min / max
                      if (rule.length && toComparePropValue.length !== rule.length) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.string_length_not_matched')
                      } else if (rule.min && toComparePropValue.length < rule.min) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.string_too_short')
                      } else if (rule.max && toComparePropValue.length > rule.max) {
                        errorMessage.message = rule.message || i18nClient.t('common:form.hint.string_too_long')
                      }
                    }

                    break
                  case 'boolean':
                    if (typeof toComparePropValue !== 'boolean') {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_a_boolean')
                    }
                    break
                  case 'array':
                    if (!(toComparePropValue instanceof Array)) {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_an_array')
                    }
                    break
                  case 'object':
                    if (!typeof toComparePropValue === 'object' || toComparePropValue instanceof Array) {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_an_object')
                    }
                    break
                  case 'date':
                    if (!(toComparePropValue instanceof Date)) {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_an_date')
                    }
                    break
                  case 'url':
                    if (!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/.test(toComparePropValue)) {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.value_need_tobe_a_url')
                    }
                    break
                  case 'regexp':
                    rule.pattern.lastIndex = 0
                    if (rule.pattern && !rule.pattern.test(toComparePropValue)) {
                      errorMessage.message = rule.message || i18nClient.t('common:form.hint.string_not_matched_pattern')
                    }
                    break
                  default:
                    if (typeof rule.validator === 'function') {
                      errorMessage = (rule.validator && rule.validator(rule, {key: fieldName, data: fieldValue})) || {}
                    }
                    break
                }

                // Check it at last
                if (rule.hasOwnProperty('required') && rule.required) {
                  let requiredErrFlag = false
                  if (toComparePropValue === undefined || toComparePropValue === null) {
                    requiredErrFlag = true
                  } else if (typeof toComparePropValue === 'string') {
                    if (toComparePropValue.trim().length === 0) {
                      requiredErrFlag = true
                    }
                  } else if (toComparePropValue === false) {
                    requiredErrFlag = true
                  } else if (toComparePropValue.hasOwnProperty('active')) {
                    if (_.isArray(toComparePropValue.active) && toComparePropValue.active.length === 0) {
                      requiredErrFlag = true
                    }
                  } else {
                    // TODO: other type required check
                  }
                  if (requiredErrFlag) {
                    errorMessage.message = rule.message || i18nClient.t('common:form.hint.required')
                  }
                }

                if (!isNullObj(errorMessage)) {
                  fieldsStatus.fieldsMeta[fieldName].errorMessage = {...errorMessage, ..._.omit(rule, ['message', 'type']), valid: false}
                  fieldsStatus.setFieldMeta(fieldName, fieldsStatus.fieldsMeta[fieldName])
                  return true // break rules.some loop
                } else {
                  delete fieldsStatus.fieldsMeta[fieldName].errorMessage
                }
              } else {
                delete fieldsStatus.fieldsMeta[fieldName].errorMessage
              }
            })
          } else {
            delete fieldsStatus.fieldsMeta[fieldName].errorMessage
          }

          this.setState({fieldsStatus: fieldsStatus}, () => {
            const fieldError = this.state.form.getFieldError(fieldName)
            if (fieldError) {
              return fieldError
            }
          })
        } else {
          return this.state.form.getFieldError(fieldName)
        }
      }
      validateFields = (fieldNames) => {
        const { fieldsStatus } = this.state
        const matchedFieldNames = fieldNames || Object.keys(fieldsStatus.fieldsMeta)
        matchedFieldNames.map(fieldName => {
          this.validateField(fieldName)
        })
        return this.state.form.getFieldsError(fieldNames)
      }
      resetFields = () => {}
      resetFieldsError = (fieldNames) => {
        const fieldsStatus = cloneFieldStatus(this.state.fieldsStatus)
        const matchedFieldNames = fieldNames || Object.keys(fieldsStatus.fieldsMeta)
        matchedFieldNames.map((fieldName, idx) => {
          const newMeta = delete fieldsStatus.getFieldMeta(fieldName).errorMessage
          fieldsStatus.setFieldMeta(fieldName, newMeta)
        })
        this.setState({fieldsStatus: fieldsStatus})
        // this.state.fieldsStatus = fieldsStatus
      }
      // Sometimes, there're not only one form on the page, maybe two, three or more and more
      // So, at this situation, developer need to specify which fields need to be used to validate when calling this method
      // Otherwise, it will validate all the registerred fields
      submit = (params, fieldsNeed) => {
        const { onSubmit } = this.props
        const errors = this.validateFields(fieldsNeed)

        if (isNullObj(errors)) {
          onSubmit(params)
        } else {
          console.log(errors)
        }
      }
      isSubmitting = () => {}
      render () {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        const props = {
          ...this.state,
          ref: (ref) => { this.form = ref }
        }
        return (
          <FormContext.Provider value={this.state.form}>
            <PassedComponent {...props} />
          </FormContext.Provider>
        )
      }
    }

    Form.displayName = `Form(${getDisplayName(PassedComponent)})`
    Form.PassedComponent = PassedComponent
    return hoistStatics(Form, PassedComponent)
  }

  return factory
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'
}

CreateForm.initForm = initForm

export default CreateForm


```

