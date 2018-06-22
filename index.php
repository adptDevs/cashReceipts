<!DOCTYPE html>
<html>
<head>
	<title>Development: Cash Receipts 2.0</title>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
	<meta http-equiv='X-UA-Compatible' content='IE=edge'/>
	<link rel='stylesheet' type='text/css' href='/dhtmlx/codebase/dhtmlx.css'/>
	<script type='text/javascript' src='/dhtmlx/codebase/dhtmlx.js'></script>
	<script type='text/javascript' src='application.js'></script>
	<style>
		html, body{
			width: 100%;
			height: 100%;
			overflow: hidden;
			border: none;
			padding: 0;
			margin: 0;
		}
	</style>

</head>
<body>
	<?php $ini = parse_ini_file('config.ini'); ?>
	<script type='text/javascript'>
		var appLayout = new dhtmlXLayoutObject(
			{
				parent: document.body,
				pattern: '2U',
				cells: [
					{
						id: 'a',
						text: '',
						header: false
					},
					{
						id: 'b',
						header: false,
						collapse: true,
						text: 'Development'
					}
				]
			});
		var varName = <?php echo json_encode($ini[directory]); ?>;

		var varName = <?php echo json_encode($user; ?>;

		getObjectType(varName);

		// Run ARF in portal
		function getObjectType(varName){
			appLayout.cells('b').detachObject();
			window[(varName)].runApp(appLayout.cells('a'), <?php echo ; ?>, <?php echo ; ?>, JSON.parse(user));
		}
	</script>

</body>
</html>