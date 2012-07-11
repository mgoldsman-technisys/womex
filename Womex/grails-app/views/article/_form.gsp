<%@ page import="womex.Article" %>



<div class="fieldcontain ${hasErrors(bean: articleInstance, field: 'code', 'error')} ">
	<label for="code">
		<g:message code="article.code.label" default="Code" />
		
	</label>
	<g:textField name="code" value="${articleInstance?.code}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: articleInstance, field: 'description', 'error')} ">
	<label for="description">
		<g:message code="article.description.label" default="Description" />
		
	</label>
	<g:textField name="description" value="${articleInstance?.description}"/>
</div>

