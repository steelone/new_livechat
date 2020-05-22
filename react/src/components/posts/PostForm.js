import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createPost, showAlert } from '../../store/actions/posts'
import { Error } from '../Error'
import { OutlinedInput, Button, FormControl, InputLabel, Grid } from '@material-ui/core';

class PostForm extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			title: ''
		}
		this.submitHandler = this.submitHandler.bind(this)
		this.changeInputHandler = this.changeInputHandler.bind(this)
	}
	submitHandler(event) {
		event.preventDefault()
		const { title } = this.state

		if (!title.trim()) {
			return this.props.showAlert(`Field shouldn't be empty!`)
		}

		const newPost = {
			title, id: Date.now().toString()
		}
		this.props.createPost(newPost)
		this.setState({ title: '' })
	}
	changeInputHandler(event) {
		const { target } = event;
		const { value } = target;
		const { name } = target;

		this.setState({ [name]: value });
	}
	render() {
		const { state } = this;
		return (
			<form onSubmit={this.submitHandler}>
				{this.props.alert && <Error message={this.props.alert} />}
				<Grid container direction="column" justify="flex-start" spacing={1}>
					<Grid item xs>
						<FormControl variant="outlined">
							<InputLabel htmlFor="component-outlined">Title</InputLabel>
							<OutlinedInput id="component-outlined" name='title' value={state.title} onChange={this.changeInputHandler} label="Title" />
						</FormControl>
					</Grid>
					<Grid item xs>
						<Button variant="contained" color="primary" type='submit'>Create</Button>
					</Grid>
				</Grid>
			</form>
		)
	}
}

const mapDispatchToProps = {
	createPost, showAlert
}

const mapStateToProps = state => ({
	alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)