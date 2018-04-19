import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';


import Typography from 'material-ui/Typography';

import { FormGroup, FormLabel } from 'material-ui/Form';
import Input from 'material-ui/Input';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

import Checkbox from 'material-ui/Checkbox'
import colourGenerator from '../../js/colourGenerator'

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rangeWrapper:
    {display:'flex', alignItems:'center', height:'28px', width:'70%',  position:'relative', marginTop:'0.75em' }
  ,
  label:{
    display:'block',
    marginBottom:'1.5em',
    width:'100%'
  },

}
class StepThree extends Component {

  _handleMouseDown(e) {
    e.stopPropagation();
    this.props.toggleDisableSlider()
  }
  _handleMouseUp(e){
    e.stopPropagation();
    this.props.toggleDisableSlider()
  }
  _handleChange(value, e) {
    this.props.updateResponseSet({question:3, scales:{...this.props.form.questionThree, [e]:value}})
  }
  render() {
    const { classes } = this.props;

    return (
      <div style={{width:'100%',height:'100%', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
        <Typography variant="headline" color="primary">
          Where would you like to see innovation efforts
        </Typography>
        <FormGroup style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-around',alignItems:'center'}}>
          <div className="range-wrapper"
           style={styles.rangeWrapper}
           onMouseDown={this._handleMouseDown.bind(this)}
           onMouseUp={this._handleMouseDown.bind(this)}>
            <div style={{width:'100%'}}>
             <FormLabel component="label" style={styles.label}>{this.props.question.scaleA}</FormLabel>
              <InputRange
                id="scaleA"
                maxValue={100}
                minValue={0}
                value={this.props.form.questionThree.scaleA}
                onChange={(value)=>this._handleChange( value, "scaleA")}
                formatLabel={value=> ''}
               />
             </div>
          </div>

          <div className="range-wrapper"
           style={styles.rangeWrapper}
           onMouseDown={this._handleMouseDown.bind(this)}
           onMouseUp={this._handleMouseDown.bind(this)}>
           <div style={{width:'100%'}}>
             <FormLabel component="label" style={styles.label}>{this.props.question.scaleB}</FormLabel>
              <InputRange
                id="scaleB"
                maxValue={100}
                minValue={0}
                value={this.props.form.questionThree.scaleB}
                onChange={(value)=>this._handleChange( value, "scaleB")}
               />
            </div>
          </div>

          <div className="range-wrapper"
           style={styles.rangeWrapper}
           onMouseDown={this._handleMouseDown.bind(this)}
           onMouseUp={this._handleMouseDown.bind(this)}>
             <div style={{width:'100%'}}>
               <FormLabel component="label" style={styles.label}>{this.props.question.scaleC}</FormLabel>
                <InputRange
                  id="scaleC"
                  maxValue={100}
                  minValue={0}
                  value={this.props.form.questionThree.scaleC}
                  onChange={(value)=>this._handleChange( value, "scaleC")}
                 />
            </div>
          </div>

          <div className="range-wrapper"
           style={styles.rangeWrapper}
           onMouseDown={this._handleMouseDown.bind(this)}
           onMouseUp={this._handleMouseDown.bind(this)}>
            <div style={{width:'100%'}}>
              <FormLabel component="label" style={styles.label}>{this.props.question.scaleD}</FormLabel>
              <InputRange
                id="scaleD"
                maxValue={100}
                minValue={0}
                value={this.props.form.questionThree.scaleD}
                onChange={(value)=>this._handleChange( value, "scaleD")}
               />
            </div>
          </div>
        </FormGroup>
      </div>

    )
  }
}

export default withStyles(styles)(StepThree);
